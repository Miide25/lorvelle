import { Package, ShoppingCart, Search, Heart } from 'lucide-react'

interface EmptyStateProps {
  type: 'products' | 'cart' | 'search' | 'wishlist'
  message?: string
}

export function EmptyState({ type, message }: EmptyStateProps) {
  const icons = {
    products: Package,
    cart: ShoppingCart,
    search: Search,
    wishlist: Heart,
  }

  const defaultMessages = {
    products: 'No products found',
    cart: 'Your cart is empty',
    search: 'No results found',
    wishlist: 'Your wishlist is empty',
  }

  const Icon = icons[type]
  const displayMessage = message || defaultMessages[type]

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      <p className="text-gray-600 text-lg">{displayMessage}</p>
    </div>
  )
}
