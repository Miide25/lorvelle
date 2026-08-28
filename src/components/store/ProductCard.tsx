import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import type { Product } from '../../types'
import { Button } from '../ui/Button'
import { useCart } from '../../contexts/CartContext'
import { useToast } from '../../contexts/ToastContext'
import { formatCurrency } from '../../utils/whatsapp'

interface ProductCardProps {
  product: Product & {
    primary_image?: string
    category_name?: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart()
  const { addToast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      productId: product.id,
      productName: product.name,
      price: product.price,
      image: product.primary_image || '',
      quantity: 1,
      variant: null,
      sku: product.sku,
    })
    addToast('Added to cart', 'success')
  }

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  const inCart = isInCart(product.id, null)

  return (
    <Link to={`/product/${product.slug}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {product.primary_image ? (
            <img
              src={product.primary_image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.new_arrival && (
              <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                New
              </span>
            )}
            {product.best_seller && (
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                Best Seller
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-pink-50"
            onClick={(e) => {
              e.preventDefault()
              // Wishlist functionality would go here
            }}
          >
            <Heart className="w-4 h-4 text-gray-600 hover:text-pink-600" />
          </button>

          {/* Out of Stock Overlay */}
          {product.stock_quantity <= 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          {product.category_name && (
            <p className="text-xs text-gray-500 mb-1">{product.category_name}</p>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="text-sm text-gray-400 line-through">
                {formatCurrency(product.compare_at_price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            size="sm"
            className="w-full"
            disabled={product.stock_quantity <= 0}
            onClick={handleAddToCart}
          >
            {inCart ? (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Bag
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  )
}
