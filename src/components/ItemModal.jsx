import React, { useState, useEffect } from 'react'
import { X, Calendar, Package } from 'lucide-react'
import { useFridge } from '../context/FridgeContext'
import { format } from 'date-fns'

const foodEmojis = [
  '🍎', '🍌', '🥛', '🍞', '🥚', '🧀', '🍗', '🥩', '🐟', '🍅',
  '🥬', '🥕', '🧅', '🥔', '🌽', '🥒', '🫐', '🍓', '🍇', '🍊',
  '🥑', '🥦', '🍋', '🥝', '🍑', '🥭', '🍍', '🥥', '🌶️', '🫒'
]

const categories = [
  'Dairy', 'Meat', 'Vegetables', 'Fruits', 'Bakery', 'Beverages',
  'Snacks', 'Frozen', 'Pantry', 'Condiments', 'Other'
]

const units = [
  'pieces', 'grams', 'kg', 'ml', 'liter', 'cups', 'tbsp', 'tsp',
  'oz', 'lbs', 'cans', 'bottles', 'packages', 'slices'
]

export default function ItemModal({ item, isOpen, onClose }) {
  const { addItem, updateItem, storageLocations } = useFridge()
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 1,
    unit: 'pieces',
    location: 'fridge',
    purchaseDate: format(new Date(), 'yyyy-MM-dd'),
    expirationDate: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    image: '📦'
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        purchaseDate: format(new Date(item.purchaseDate), 'yyyy-MM-dd'),
        expirationDate: format(new Date(item.expirationDate), 'yyyy-MM-dd')
      })
    } else {
      setFormData({
        name: '',
        category: '',
        quantity: 1,
        unit: 'pieces',
        location: 'fridge',
        purchaseDate: format(new Date(), 'yyyy-MM-dd'),
        expirationDate: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
        image: '📦'
      })
    }
    setErrors({})
  }, [item, isOpen])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0'
    }
    
    if (new Date(formData.expirationDate) <= new Date(formData.purchaseDate)) {
      newErrors.expirationDate = 'Expiration date must be after purchase date'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const itemData = {
      ...formData,
      quantity: Number(formData.quantity),
      purchaseDate: new Date(formData.purchaseDate),
      expirationDate: new Date(formData.expirationDate)
    }

    if (item) {
      updateItem(itemData)
    } else {
      addItem(itemData)
    }

    onClose()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {item ? 'Edit Item' : 'Add New Item'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Basic Information</h4>
                
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="e.g., Organic Milk"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`select-field ${errors.category ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                {/* Quantity and Unit */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="0"
                      step="0.1"
                      className={`input-field ${errors.quantity ? 'border-red-500' : ''}`}
                    />
                    {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                  </div>
                  <div>
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <select
                      id="unit"
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="select-field"
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Storage Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="select-field"
                  >
                    {storageLocations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.icon} {location.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates and Icon */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Dates & Icon</h4>
                
                {/* Purchase Date */}
                <div>
                  <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    id="purchaseDate"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                {/* Expiration Date */}
                <div>
                  <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Date *
                  </label>
                  <input
                    type="date"
                    id="expirationDate"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    className={`input-field ${errors.expirationDate ? 'border-red-500' : ''}`}
                  />
                  {errors.expirationDate && <p className="text-red-500 text-sm mt-1">{errors.expirationDate}</p>}
                </div>

                {/* Icon Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Icon
                  </label>
                  <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
                    {foodEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: emoji }))}
                        className={`p-2 text-xl rounded-lg hover:bg-gray-100 ${
                          formData.image === emoji ? 'bg-primary-100 ring-2 ring-primary-500' : ''
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-3xl">{formData.image}</span>
                    <p className="text-sm text-gray-500">Selected icon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                {item ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}