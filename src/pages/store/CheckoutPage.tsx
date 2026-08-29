import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { useToast } from '../../contexts/ToastContext'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton'
import { formatCurrency, generateOrderNumber, createWhatsAppMessage, openWhatsApp, validateWhatsAppCheckout } from '../../utils/whatsapp'
import { supabase } from '../../lib/supabase'
import type { Settings } from '../../types'
import { ArrowLeft, ShoppingBag, MessageCircle } from 'lucide-react'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, clearCart, getCartTotal } = useCart()
  const { addToast } = useToast()

  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState<Settings | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    deliveryInstructions: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const subtotal = getCartTotal()
  const deliveryFee = settings?.delivery_fee || 2000
  const total = subtotal + deliveryFee

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart')
      return
    }
    fetchSettings()
  }, [cart, navigate])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single()

      if (error) throw error
      setSettings(data)
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      addToast('Please fix the errors in the form', 'error')
      return
    }

    // Validate WhatsApp checkout requirements
    const validation = validateWhatsAppCheckout(
      cart,
      formData.fullName,
      formData.phone,
      formData.address,
      settings?.whatsapp_number || ''
    )

    if (!validation.valid) {
      addToast(validation.error || 'Checkout validation failed', 'error')
      return
    }

    setLoading(true)

    try {
      const orderNumber = generateOrderNumber()

      const whatsappMessage = createWhatsAppMessage(
        orderNumber,
        cart,
        subtotal,
        deliveryFee,
        total,
        formData.fullName,
        formData.phone,
        formData.address,
        formData.deliveryInstructions
      )
      const orderId = crypto.randomUUID()

      // Do not select the inserted row: guest checkout has INSERT permission,
      // but must not be granted permission to read customer orders.
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          order_number: orderNumber,
          customer_name: formData.fullName,
          customer_phone: formData.phone,
          delivery_address: formData.address,
          city: formData.city,
          state: formData.state,
          delivery_instructions: formData.deliveryInstructions || null,
          subtotal,
          discount: 0,
          delivery_fee: deliveryFee,
          total,
          status: 'pending',
          whatsapp_message: whatsappMessage,
        })

      if (orderError) throw orderError

      const orderItems = cart.map((item) => ({
        order_id: orderId,
        product_id: item.productId,
        product_name: item.productName,
        quantity: item.quantity,
        unit_price: item.price,
        selected_variant: item.variant,
        total: item.price * item.quantity,
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      // Open WhatsApp. Direct navigation is intentional: popup blockers commonly
      // reject window.open after the async order request has completed.
      const whatsappOpened = openWhatsApp(settings?.whatsapp_number || '', whatsappMessage)

      clearCart()

      if (whatsappOpened) {
        addToast('Order placed successfully! Opening WhatsApp.', 'success')
      } else {
        addToast('Order placed, but the store WhatsApp number is invalid.', 'error')
      }
    } catch (error) {
      console.error('Error creating order:', error)
      addToast('Failed to place order. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <LoadingSkeleton className="h-96" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center text-gray-600 hover:text-pink-600 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Complete your order details</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Information</h2>

                <div className="space-y-4">
                  <Input
                    label="Full Name *"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={errors.fullName}
                    placeholder="Enter your full name"
                    required
                  />

                  <Input
                    label="WhatsApp Phone Number *"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    placeholder="e.g., 08012345678"
                    required
                  />

                  <Input
                    label="Delivery Address *"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={errors.address}
                    placeholder="Enter your delivery address"
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="City *"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={errors.city}
                      placeholder="Enter your city"
                      required
                    />

                    <Input
                      label="State *"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      error={errors.state}
                      placeholder="Enter your state"
                      required
                    />
                  </div>

                  <Textarea
                    label="Delivery Instructions (Optional)"
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    placeholder="Any special instructions for delivery"
                    rows={3}
                  />
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>

                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={`${item.productId}-${item.variant}`} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No image</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.productName}</h3>
                        {item.variant && (
                          <p className="text-sm text-gray-500">Variant: {item.variant}</p>
                        )}
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>

                      <p className="font-bold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>{formatCurrency(deliveryFee)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-xl">{formatCurrency(total)}</span>
                  </div>
                </div>

                <div className="bg-pink-50 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-pink-900 font-medium mb-1">
                        Order via WhatsApp
                      </p>
                      <p className="text-xs text-pink-700">
                        After clicking "Continue to WhatsApp", your order will be sent to our WhatsApp for confirmation and payment instructions.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    'Processing...'
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Continue to WhatsApp
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="w-full mt-4 text-sm text-gray-600 hover:text-pink-600"
                >
                  <ShoppingBag className="w-4 h-4 inline mr-2" />
                  Back to Cart
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
