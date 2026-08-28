import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { Trash2, ShoppingBag } from 'lucide-react'
import { formatCurrency } from '../../utils/whatsapp'

interface WishlistItem {
  productId: string
  productName: string
  price: number
  image: string
  addedAt: number
}

export function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = () => {
    const saved = localStorage.getItem('beauty-queen-wishlist')
    if (saved) {
      try {
        setWishlist(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to parse wishlist:', error)
      }
    }
  }

  const saveWishlist = (items: WishlistItem[]) => {
    localStorage.setItem('beauty-queen-wishlist', JSON.stringify(items))
    setWishlist(items)
  }

  const removeFromWishlist = (productId: string) => {
    const updated = wishlist.filter(item => item.productId !== productId)
    saveWishlist(updated)
  }

  const addToCartFromWishlist = (item: WishlistItem) => {
    addToCart({
      productId: item.productId,
      productName: item.productName,
      price: item.price,
      image: item.image,
      quantity: 1,
      variant: null,
      sku: null,
    })
    removeFromWishlist(item.productId)
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Wishlist</h1>
          <EmptyState type="wishlist" />
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Wishlist</h1>
        <p className="text-gray-600 mb-6">{wishlist.length} items saved</p>

        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item.productId}
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
                <p className="font-bold text-gray-900 mb-3">{formatCurrency(item.price)}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => addToCartFromWishlist(item)}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <button
                    onClick={() => removeFromWishlist(item.productId)}
                    className="px-3 py-2 text-gray-600 hover:text-red-600 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
