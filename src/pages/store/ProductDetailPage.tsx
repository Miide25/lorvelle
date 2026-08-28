import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Product, ProductImage, ProductVariant } from '../../types'
import { supabase } from '../../lib/supabase'
import { useCart } from '../../contexts/CartContext'
import { useToast } from '../../contexts/ToastContext'
import { Button } from '../../components/ui/Button'
import { ProductCard } from '../../components/store/ProductCard'
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton'
import { formatCurrency } from '../../utils/whatsapp'
import { Minus, Plus, Heart, Share2, MessageCircle, ShoppingCart, Star } from 'lucide-react'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [images, setImages] = useState<ProductImage[]>([])
  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)

  const { addToCart } = useCart()
  const { addToast } = useToast()

  useEffect(() => {
    if (slug) {
      fetchProduct()
    }
  }, [slug])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      // Fetch product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'active')
        .single()

      if (productError) throw productError
      setProduct(productData)

      // Fetch images
      const { data: imagesData } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', productData.id)
        .order('display_order')

      setImages(imagesData || [])

      // Fetch variants
      const { data: variantsData } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', productData.id)

      setVariants(variantsData || [])

      // Fetch related products
      if (productData.category_id) {
        const { data: relatedData } = await supabase
          .from('products')
          .select(`
            *,
            product_images(image_url, display_order),
            categories(name)
          `)
          .eq('category_id', productData.category_id)
          .eq('status', 'active')
          .neq('id', productData.id)
          .limit(4)

        setRelatedProducts(
          relatedData?.map((p: any) => ({
            ...p,
            primary_image: p.product_images?.[0]?.image_url || null,
            category_name: p.categories?.name || null,
          })) || []
        )
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    setAddingToCart(true)
    const finalPrice = selectedVariant
      ? product.price + selectedVariant.price_adjustment
      : product.price

    addToCart({
      productId: product.id,
      productName: product.name,
      price: finalPrice,
      image: images[0]?.image_url || '',
      quantity,
      variant: selectedVariant?.value || null,
      sku: product.sku,
    })

    addToast('Added to cart', 'success')
    setAddingToCart(false)
  }

  const handleWhatsAppOrder = () => {
    if (!product) return

    const finalPrice = selectedVariant
      ? product.price + selectedVariant.price_adjustment
      : product.price

    addToCart({
      productId: product.id,
      productName: product.name,
      price: finalPrice,
      image: images[0]?.image_url || '',
      quantity,
      variant: selectedVariant?.value || null,
      sku: product.sku,
    })

    // Navigate to checkout
    window.location.href = '/checkout'
  }

  const updateQuantity = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta)
    setQuantity(newQuantity)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LoadingSkeleton className="aspect-square" />
            <div className="space-y-4">
              <LoadingSkeleton className="h-8 w-3/4" />
              <LoadingSkeleton className="h-4 w-1/2" />
              <LoadingSkeleton className="h-6 w-1/3" />
              <LoadingSkeleton className="h-32 w-full" />
              <LoadingSkeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Product not found</p>
      </div>
    )
  }

  const finalPrice = selectedVariant
    ? product.price + selectedVariant.price_adjustment
    : product.price
  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - finalPrice) / product.compare_at_price) * 100)
    : 0
  const inStock = product.stock_quantity > 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link to="/" className="hover:text-pink-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-pink-600">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-white rounded-lg overflow-hidden mb-4">
              {images[selectedImage] ? (
                <img
                  src={images[selectedImage].image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-pink-600' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image.image_url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.new_arrival && (
                <span className="bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full font-medium">
                  New Arrival
                </span>
              )}
              {product.best_seller && (
                <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                  Best Seller
                </span>
              )}
              {product.featured && (
                <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-medium">
                  Featured
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.8)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(finalPrice)}
              </span>
              {product.compare_at_price && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatCurrency(product.compare_at_price)}
                  </span>
                  {discount > 0 && (
                    <span className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded font-medium">
                      Save {discount}%
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {inStock ? (
                <span className="text-green-600 text-sm font-medium">
                  In Stock ({product.stock_quantity} available)
                </span>
              ) : (
                <span className="text-red-600 text-sm font-medium">
                  Currently unavailable
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Variants */}
            {variants.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {variants[0].name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-lg border-2 ${
                        selectedVariant?.id === variant.id
                          ? 'border-pink-600 bg-pink-50 text-pink-700'
                          : 'border-gray-300 text-gray-700 hover:border-pink-600'
                      }`}
                    >
                      {variant.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(1)}
                  disabled={quantity >= (product.stock_quantity || 10)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-6">
              <Button
                size="lg"
                className="w-full"
                disabled={!inStock || addingToCart}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {addingToCart ? 'Adding...' : 'Add to Bag'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                disabled={!inStock}
                onClick={handleWhatsAppOrder}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Order via WhatsApp
              </Button>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6 space-y-3 text-sm">
              {product.sku && (
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="text-gray-900">{product.sku}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="text-gray-900">Beauty</span>
              </div>
            </div>

            {/* Share & Wishlist */}
            <div className="flex gap-4 mt-6">
              <button className="flex items-center gap-2 text-gray-600 hover:text-pink-600">
                <Heart className="w-5 h-5" />
                <span className="text-sm">Add to Wishlist</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-pink-600">
                <Share2 className="w-5 h-5" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
