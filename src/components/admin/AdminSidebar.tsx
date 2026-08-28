import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, Tag, ShoppingCart, Users, Percent, Settings, LogOut, Store } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface NavItem {
  path: string
  label: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/products', label: 'Products', icon: Package },
  { path: '/admin/categories', label: 'Categories', icon: Tag },
  { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/admin/customers', label: 'Customers', icon: Users },
  { path: '/admin/discounts', label: 'Discounts', icon: Percent },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar() {
  const location = useLocation()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/admin/login'
  }

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0">
      <div className="p-6">
        <Link to="/admin" className="flex items-center gap-3">
          <Store className="w-8 h-8 text-pink-400" />
          <div>
            <h1 className="text-xl font-bold">Lorvelle</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-pink-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
