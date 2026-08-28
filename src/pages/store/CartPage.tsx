import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { formatCurrency } from '../../utils/whatsapp'

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const subtotal = getCartTotal()
  const deliveryFee = 2000 // Default delivery fee, should come from settings
  const total = subtotal + deliveryFee

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <EmptyState type="cart" />
          <div className="mt-8 text-center">
            <Link to="/shop">
              <Button size="lg">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.variant}`}
                className="bg-white rounded-lg p-4 shadow-sm flex gap-4"
              >
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
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

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.productName}</h3>
                  {item.variant && (
                    <p className="text-sm text-gray-500 mb-2">Variant: {item.variant}</p>
                  )}
                  {item.sku && (
                    <p className="text-sm text-gray-500 mb-2">SKU: {item.sku}</p>
                  )}
                  <p className="font-bold text-gray-900">{formatCurrency(item.price)}</p>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.productId, item.variant)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.variant, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.variant, item.quantity + 1)}
                      className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="font-bold text-gray-900 mt-2">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
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

              <Link to="/checkout" className="block">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link to="/shop" className="block mt-4">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
