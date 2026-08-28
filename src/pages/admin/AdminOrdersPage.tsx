import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { formatCurrency } from '../../utils/whatsapp'
import { Button } from '../../components/ui/Button'
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton'
import { MessageCircle } from 'lucide-react'

export function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) throw error
      fetchOrders()
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Failed to update order status')
    }
  }

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '')
    window.open(`https://wa.me/${cleanPhone}`, '_blank')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'contacted': return 'bg-blue-100 text-blue-700'
      case 'payment_pending': return 'bg-orange-100 text-orange-700'
      case 'paid': return 'bg-green-100 text-green-700'
      case 'processing': return 'bg-purple-100 text-purple-700'
      case 'shipped': return 'bg-indigo-100 text-indigo-700'
      case 'delivered': return 'bg-green-100 text-green-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <LoadingSkeleton className="h-96" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600">Manage customer orders</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No orders yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{order.order_number}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer_name}</p>
                        <p className="text-sm text-gray-500">{order.customer_phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="payment_pending">Payment Pending</option>
                        <option value="paid">Paid</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openWhatsApp(order.customer_phone)}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Order {selectedOrder.order_number}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><span className="text-gray-600">Name:</span> {selectedOrder.customer_name}</p>
                  <p><span className="text-gray-600">Phone:</span> {selectedOrder.customer_phone}</p>
                  <p><span className="text-gray-600">Address:</span> {selectedOrder.delivery_address}</p>
                  <p><span className="text-gray-600">City:</span> {selectedOrder.city}</p>
                  <p><span className="text-gray-600">State:</span> {selectedOrder.state}</p>
                  {selectedOrder.delivery_instructions && (
                    <p><span className="text-gray-600">Instructions:</span> {selectedOrder.delivery_instructions}</p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Items</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <OrderItems orderId={selectedOrder.id} />
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span>{formatCurrency(selectedOrder.delivery_fee)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Message */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">WhatsApp Message</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">{selectedOrder.whatsapp_message}</pre>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  onClick={() => openWhatsApp(selectedOrder.customer_phone)}
                  className="flex-1"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Open WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function OrderItems({ orderId }: { orderId: string }) {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [orderId])

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId)

      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Error fetching order items:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-gray-500">Loading items...</div>
  }

  if (items.length === 0) {
    return <div className="text-gray-500">No items found</div>
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
          <div>
            <p className="font-medium text-gray-900">{item.product_name}</p>
            <p className="text-sm text-gray-500">
              Qty: {item.quantity} × {formatCurrency(item.unit_price)}
            </p>
            {item.selected_variant && (
              <p className="text-sm text-gray-500">Variant: {item.selected_variant}</p>
            )}
          </div>
          <span className="font-medium text-gray-900">{formatCurrency(item.total)}</span>
        </div>
      ))}
    </div>
  )
}
