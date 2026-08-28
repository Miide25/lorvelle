import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton'
import { Upload } from 'lucide-react'

export function AdminSettingsPage() {
  const [settings, setSettings] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    storeName: '',
    storeLogo: '',
    storeDescription: '',
    whatsappNumber: '',
    currency: 'NGN',
    deliveryFee: '',
    contactEmail: '',
    phoneNumber: '',
    address: '',
    instagramUrl: '',
    facebookUrl: '',
    tiktokUrl: '',
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single()

      if (error) {
        // If no settings exist, create default
        if (error.code === 'PGRST116') {
          const { data: newSettings, error: insertError } = await supabase
            .from('settings')
            .insert({
              store_name: 'Lorvelle',
              store_description: 'Beauty. Elegance. You. Your destination for premium beauty products',
              whatsapp_number: '2349163047095',
              currency: 'NGN',
              delivery_fee: 2000,
              contact_email: 'estherglory149@gmail.com',
              phone_number: '2349163047095',
              address: 'Number 3 Mercy Street, Banku Warewa',
            })
            .select()
            .single()

          if (insertError) throw insertError
          setSettings(newSettings)
          populateForm(newSettings)
        } else {
          throw error
        }
      } else {
        setSettings(data)
        populateForm(data)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const populateForm = (data: any) => {
    setFormData({
      storeName: data.store_name || '',
      storeLogo: data.store_logo || '',
      storeDescription: data.store_description || '',
      whatsappNumber: data.whatsapp_number || '',
      currency: data.currency || 'NGN',
      deliveryFee: data.delivery_fee?.toString() || '2000',
      contactEmail: data.contact_email || '',
      phoneNumber: data.phone_number || '',
      address: data.address || '',
      instagramUrl: data.instagram_url || '',
      facebookUrl: data.facebook_url || '',
      tiktokUrl: data.tiktok_url || '',
    })
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `settings/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        throw new Error(`Failed to upload logo: ${uploadError.message}`)
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      setFormData({ ...formData, storeLogo: publicUrl })
    } catch (error: any) {
      console.error('Error uploading logo:', error)
      alert(error.message || 'Failed to upload logo')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const settingsData = {
        store_name: formData.storeName,
        store_logo: formData.storeLogo || null,
        store_description: formData.storeDescription,
        whatsapp_number: formData.whatsappNumber,
        currency: formData.currency,
        delivery_fee: parseFloat(formData.deliveryFee),
        contact_email: formData.contactEmail,
        phone_number: formData.phoneNumber,
        address: formData.address,
        instagram_url: formData.instagramUrl || null,
        facebook_url: formData.facebookUrl || null,
        tiktok_url: formData.tiktokUrl || null,
      }

      const { error } = await supabase
        .from('settings')
        .update(settingsData)
        .eq('id', settings.id)
        .select()
        .single()

      if (error) throw error

      // Update local state immediately
      setSettings({ ...settings, ...settingsData })
      alert('Settings saved successfully')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings')
    } finally {
      setSaving(false)
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
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your store settings</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Store Information</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Store Logo</label>
            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition-colors">
              {formData.storeLogo ? (
                <img
                  src={formData.storeLogo}
                  alt="Store logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload logo</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
            {formData.storeLogo && (
              <button
                type="button"
                onClick={() => setFormData({ ...formData, storeLogo: '' })}
                className="mt-2 text-sm text-red-600 hover:text-red-700"
              >
                Remove logo
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Store Name *"
              value={formData.storeName}
              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              required
            />

            <Input
              label="Currency *"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Store Description *</label>
            <Textarea
              value={formData.storeDescription}
              onChange={(e) => setFormData({ ...formData, storeDescription: e.target.value })}
              rows={3}
              required
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="WhatsApp Number *"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              placeholder="e.g., 2348000000000"
              required
            />

            <Input
              label="Contact Email *"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Phone Number *"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />

            <Input
              label="Delivery Fee *"
              type="number"
              step="0.01"
              value={formData.deliveryFee}
              onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
            <Textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
              required
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Social Media</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Instagram URL"
              value={formData.instagramUrl}
              onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
              placeholder="https://instagram.com/yourstore"
            />

            <Input
              label="Facebook URL"
              value={formData.facebookUrl}
              onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
              placeholder="https://facebook.com/yourstore"
            />

            <Input
              label="TikTok URL"
              value={formData.tiktokUrl}
              onChange={(e) => setFormData({ ...formData, tiktokUrl: e.target.value })}
              placeholder="https://tiktok.com/@yourstore"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving || uploading}>
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  )
}
