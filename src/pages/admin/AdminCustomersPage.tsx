import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { formatCurrency } from '../../utils/whatsapp'
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton'

export function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    setLoading(true)
    try {
      // Get unique customers from orders
      const { data: orders } = await supabase
        .from('orders')
        .select('customer_name, customer_phone, total, created_at')
        .order('created_at', { ascending: false })

      if (!orders) {
        setCustomers([])
        return
      }

      // Group by customer phone to get unique customers
      const customerMap = new Map()

      orders.forEach((order) => {
        const phone = order.customer_phone
        if (!customerMap.has(phone)) {
          customerMap.set(phone, {
            name: order.customer_name,
            phone: phone,
            totalSpent: order.total,
            orderCount: 1,
            lastOrderDate: order.created_at,
          })
        } else {
          const customer = customerMap.get(phone)
          customer.totalSpent += order.total
          customer.orderCount += 1
          if (new Date(order.created_at) > new Date(customer.lastOrderDate)) {
            customer.lastOrderDate = order.created_at
          }
        }
      })

      const customersArray = Array.from(customerMap.values())
      setCustomers(customersArray)
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      setLoading(false)
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
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600">Customer information from orders</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {customers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No customers yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {customers.map((customer, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {customer.orderCount}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {formatCurrency(customer.totalSpent)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(customer.lastOrderDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
