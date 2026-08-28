import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Product } from '../../types'
import { supabase } from '../../lib/supabase'
import { ProductCard } from '../../components/store/ProductCard'
import { ProductCardSkeleton } from '../../components/ui/LoadingSkeleton'
import { EmptyState } from '../../components/ui/EmptyState'
import { Button } from '../../components/ui/Button'
import { Grid, List } from 'lucide-react'

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<(Product & { primary_image?: string; category_name?: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categoryFilter = searchParams.get('category')
  const searchQuery = searchParams.get('search')
  const sortBy = searchParams.get('sort') || 'featured'

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [categoryFilter, searchQuery, sortBy])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          product_images(image_url, display_order),
          categories(name)
        `)
        .eq('status', 'active')

      if (categoryFilter) {
        query = query.eq('categories.slug', categoryFilter)
      }

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
      }

      const { data, error } = await query

      if (error) throw error

      let processedProducts = data?.map((product: any) => ({
        ...product,
        primary_image: product.product_images?.[0]?.image_url || null,
        category_name: product.categories?.name || null,
      })) || []

      // Sort products
      switch (sortBy) {
        case 'newest':
          processedProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          break
        case 'price-low':
          processedProducts.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          processedProducts.sort((a, b) => b.price - a.price)
          break
        case 'best-selling':
          processedProducts.sort((a, b) => (b.best_seller ? 1 : 0) - (a.best_seller ? 1 : 0))
          break
        default:
          processedProducts.sort((a, b) => (a.featured ? -1 : 1) - (b.featured ? -1 : 1))
      }

      setProducts(processedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('active', true)

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    setSearchParams(params)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop</h1>
          <p className="text-gray-600">Discover our complete collection of beauty products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchParams({})
                  }}
                >
                  Clear
                </Button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter('category', null)}
                    className={`block w-full text-left text-sm ${
                      !categoryFilter ? 'text-pink-600 font-medium' : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => updateFilter('category', category.slug)}
                      className={`block w-full text-left text-sm ${
                        categoryFilter === category.slug
                          ? 'text-pink-600 font-medium'
                          : 'text-gray-600 hover:text-pink-600'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="best-selling">Best Selling</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* View Toggle */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState type="products" message="No products found matching your criteria" />
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
