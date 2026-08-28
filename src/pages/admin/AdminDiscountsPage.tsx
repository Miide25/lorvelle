import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton'
import { Plus, Edit, Trash2 } from 'lucide-react'

export function AdminDiscountsPage() {
  const [discounts, setDiscounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingDiscount, setEditingDiscount] = useState<any | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    percentage: '',
    startDate: '',
    endDate: '',
    active: true,
  })

  useEffect(() => {
    fetchDiscounts()
  }, [])

  const fetchDiscounts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('discounts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setDiscounts(data || [])
    } catch (error) {
      console.error('Error fetching discounts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const discountData = {
        name: formData.name,
        percentage: parseFloat(formData.percentage),
        start_date: formData.startDate,
        end_date: formData.endDate,
        active: formData.active,
      }

      if (editingDiscount) {
        const { error } = await supabase
          .from('discounts')
          .update(discountData)
          .eq('id', editingDiscount.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('discounts')
          .insert(discountData)

        if (error) throw error
      }

      resetForm()
      fetchDiscounts()
    } catch (error) {
      console.error('Error saving discount:', error)
      alert('Failed to save discount')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (discount: any) => {
    setEditingDiscount(discount)
    setFormData({
      name: discount.name,
      percentage: discount.percentage.toString(),
      startDate: discount.start_date.split('T')[0],
      endDate: discount.end_date.split('T')[0],
      active: discount.active,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this discount?')) return

    try {
      const { error } = await supabase.from('discounts').delete().eq('id', id)
      if (error) throw error
      fetchDiscounts()
    } catch (error) {
      console.error('Error deleting discount:', error)
      alert('Failed to delete discount')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      percentage: '',
      startDate: '',
      endDate: '',
      active: true,
    })
    setEditingDiscount(null)
    setShowForm(false)
  }

  if (loading && !showForm) {
    return (
      <div className="p-8">
        <LoadingSkeleton className="h-96" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Discounts</h1>
          <p className="text-gray-600">Manage discount campaigns</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Discount
        </Button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {editingDiscount ? 'Edit Discount' : 'Add New Discount'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Discount Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Input
                label="Percentage *"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.percentage}
                onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Start Date *"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />

              <Input
                label="End Date *"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <span className="ml-2 text-gray-700">Active</span>
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : editingDiscount ? 'Update Discount' : 'Create Discount'}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {discounts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No discounts found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {discounts.map((discount) => (
                    <tr key={discount.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {discount.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {discount.percentage}%
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(discount.start_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(discount.end_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          discount.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {discount.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(discount)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(discount.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
