import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { formatCurrency } from '../../utils/whatsapp'
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton'
import { Package, ShoppingCart, DollarSign, AlertCircle, ArrowRight } from 'lucide-react'

interface DashboardStats {
  totalProducts: number
  activeProducts: number
  totalOrders: number
  pendingOrders: number
  paidOrders: number
  revenue: number
  lowStockProducts: number
}

export function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Fetch products stats
      const { data: products } = await supabase
        .from('products')
        .select('id, status, stock_quantity')

      const totalProducts = products?.length || 0
      const activeProducts = products?.filter(p => p.status === 'active').length || 0
      const lowStockProducts = products?.filter(p => p.stock_quantity < 10 && p.status === 'active') || []

      // Fetch orders stats
      const { data: orders } = await supabase
        .from('orders')
        .select('id, status, total, created_at')

      const totalOrders = orders?.length || 0
      const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0
      const paidOrders = orders?.filter(o => o.status === 'paid').length || 0
      const revenue = orders?.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.total, 0) || 0

      // Fetch recent orders
      const { data: recentOrdersData } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      setStats({
        totalProducts,
        activeProducts,
        totalOrders,
        pendingOrders,
        paidOrders,
        revenue,
        lowStockProducts: lowStockProducts.length,
      })

      setRecentOrders(recentOrdersData || [])
      setLowStockProducts(lowStockProducts)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
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

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'bg-blue-500',
      link: '/admin/products',
    },
    {
      title: 'Active Products',
      value: stats?.activeProducts || 0,
      icon: Package,
      color: 'bg-green-500',
      link: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'bg-purple-500',
      link: '/admin/orders',
    },
    {
      title: 'Pending Orders',
      value: stats?.pendingOrders || 0,
      icon: AlertCircle,
      color: 'bg-yellow-500',
      link: '/admin/orders',
    },
    {
      title: 'Paid Orders',
      value: stats?.paidOrders || 0,
      icon: ShoppingCart,
      color: 'bg-green-500',
      link: '/admin/orders',
    },
    {
      title: 'Revenue',
      value: formatCurrency(stats?.revenue || 0),
      icon: DollarSign,
      color: 'bg-pink-500',
      link: '/admin/orders',
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your store performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.title}
              to={stat.link}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
              <Link to="/admin/orders" className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{order.order_number}</p>
                      <p className="text-sm text-gray-500">{order.customer_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{formatCurrency(order.total)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'paid' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Low Stock Products</h2>
              <Link to="/admin/products" className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            {lowStockProducts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">All products are well stocked</p>
            ) : (
              <div className="space-y-4">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-red-600">
                        {product.stock_quantity} left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
