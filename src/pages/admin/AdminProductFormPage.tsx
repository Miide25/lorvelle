import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton'
import { ArrowLeft, Upload, X } from 'lucide-react'

export function AdminProductFormPage() {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const isEditing = !!id

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [uploadedImages, setUploadedImages] = useState<any[]>([])

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: '',
    compareAtPrice: '',
    categoryId: '',
    stockQuantity: '',
    sku: '',
    featured: false,
    bestSeller: false,
    newArrival: false,
    status: 'active' as 'active' | 'draft' | 'archived',
  })

  useEffect(() => {
    fetchCategories()
    if (isEditing) {
      fetchProduct()
    }
  }, [id, isEditing])

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

  const fetchProduct = async () => {
    if (!id) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      setFormData({
        name: data.name,
        slug: data.slug,
        description: data.description,
        shortDescription: data.short_description || '',
        price: data.price.toString(),
        compareAtPrice: data.compare_at_price?.toString() || '',
        categoryId: data.category_id || '',
        stockQuantity: data.stock_quantity.toString(),
        sku: data.sku || '',
        featured: data.featured,
        bestSeller: data.best_seller,
        newArrival: data.new_arrival,
        status: data.status,
      })

      // Fetch product images
      const { data: images } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', id)
        .order('display_order')

      setUploadedImages(images || [])
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      // Do not call listBuckets here: Supabase intentionally restricts bucket
      // listing, so a valid bucket can look missing to the browser client.
      for (const file of files) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `products/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) {
          console.error('Upload error:', uploadError)
          throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`)
        }

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath)

        setUploadedImages(prev => [...prev, {
          image_url: publicUrl,
          storage_path: filePath,
          display_order: prev.length,
        }])
      }
    } catch (error: any) {
      console.error('Error uploading image:', error)
      alert(error.message || 'Failed to upload image. Please check your Supabase storage configuration.')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const productData = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        description: formData.description,
        short_description: formData.shortDescription || null,
        price: parseFloat(formData.price),
        compare_at_price: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
        category_id: formData.categoryId || null,
        stock_quantity: parseInt(formData.stockQuantity),
        sku: formData.sku || null,
        featured: formData.featured,
        best_seller: formData.bestSeller,
        new_arrival: formData.newArrival,
        status: formData.status,
      }

      let productId: string

      if (isEditing) {
        const { data, error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id)
          .select()
          .single()

        if (error) throw error
        productId = data.id

        // Delete existing images
        await supabase
          .from('product_images')
          .delete()
          .eq('product_id', id)
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert(productData)
          .select()
          .single()

        if (error) throw error
        productId = data.id
      }

      // Insert images
      if (uploadedImages.length > 0) {
        const imagesToInsert = uploadedImages.map((img, index) => ({
          product_id: productId,
          image_url: img.image_url,
          storage_path: img.storage_path,
          display_order: index,
        }))

        await supabase
          .from('product_images')
          .insert(imagesToInsert)
      }

      navigate('/admin/products')
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEditing) {
    return (
      <div className="p-8">
        <LoadingSkeleton className="h-96" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center text-gray-600 hover:text-pink-600 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Product Name *"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                if (!formData.slug) {
                  setFormData({ ...formData, slug: generateSlug(e.target.value) })
                }
              }}
              required
            />

            <Input
              label="Slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="auto-generated from name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            <Textarea
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              rows={2}
              placeholder="Brief description for product cards"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Pricing & Inventory</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Price *"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />

            <Input
              label="Compare at Price"
              type="number"
              step="0.01"
              value={formData.compareAtPrice}
              onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
              placeholder="Original price for discounts"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Stock Quantity *"
              type="number"
              value={formData.stockQuantity}
              onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
              required
            />

            <Input
              label="SKU"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              placeholder="Stock keeping unit"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Product Images</h2>

          <div className="mb-4">
            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition-colors">
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload images</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          {uploadedImages.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.image_url}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Product Flags</h2>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
              />
              <span className="ml-2 text-gray-700">Featured Product</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.bestSeller}
                onChange={(e) => setFormData({ ...formData, bestSeller: e.target.checked })}
                className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
              />
              <span className="ml-2 text-gray-700">Best Seller</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.newArrival}
                onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })}
                className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
              />
              <span className="ml-2 text-gray-700">New Arrival</span>
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/products')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading || uploading}>
            {loading ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  )
}
