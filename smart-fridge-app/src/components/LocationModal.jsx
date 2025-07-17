import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useFridge } from '../context/FridgeContext'

const locationIcons = [
  '❄️', '🧊', '🏠', '🍽️', '🥶', '🌡️', '📦', '🗄️', 
  '🚪', '🍳', '☀️', '🌙', '🔥', '💧', '🌬️', '🍃'
]

const temperaturePresets = [
  { label: 'Freezer', value: '-18°C', icon: '🧊' },
  { label: 'Refrigerator', value: '4°C', icon: '❄️' },
  { label: 'Room Temperature', value: '20°C', icon: '🏠' },
  { label: 'Warm', value: '25°C', icon: '☀️' },
  { label: 'Custom', value: 'custom', icon: '🌡️' }
]

export default function LocationModal({ location, isOpen, onClose }) {
  const { addLocation, updateLocation } = useFridge()
  
  const [formData, setFormData] = useState({
    name: '',
    icon: '🏠',
    temperature: 'Room Temperature',
    description: ''
  })

  const [customTemp, setCustomTemp] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (location) {
      setFormData({
        ...location,
        description: location.description || ''
      })
      
      // Check if temperature is custom
      const isPreset = temperaturePresets.some(preset => preset.value === location.temperature)
      if (!isPreset) {
        setCustomTemp(location.temperature)
        setFormData(prev => ({ ...prev, temperature: 'custom' }))
      }
    } else {
      setFormData({
        name: '',
        icon: '🏠',
        temperature: 'Room Temperature',
        description: ''
      })
      setCustomTemp('')
    }
    setErrors({})
  }, [location, isOpen])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (formData.temperature === 'custom' && !customTemp.trim()) {
      newErrors.temperature = 'Custom temperature is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const locationData = {
      ...formData,
      temperature: formData.temperature === 'custom' ? customTemp : formData.temperature
    }

    if (location) {
      updateLocation(locationData)
    } else {
      addLocation(locationData)
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

  const handleTemperatureChange = (e) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, temperature: value }))
    
    // If not custom, clear custom temperature
    if (value !== 'custom') {
      setCustomTemp('')
    }
    
    if (errors.temperature) {
      setErrors(prev => ({ ...prev, temperature: '' }))
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
        <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {location ? 'Edit Storage Location' : 'Add Storage Location'}
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
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Location Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                placeholder="e.g., Main Refrigerator, Pantry"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Icon
              </label>
              <div className="grid grid-cols-8 gap-2 border border-gray-300 rounded-lg p-3">
                {locationIcons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, icon }))}
                    className={`p-2 text-xl rounded-lg hover:bg-gray-100 transition-colors ${
                      formData.icon === icon ? 'bg-primary-100 ring-2 ring-primary-500' : ''
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <div className="mt-3 text-center">
                <span className="text-3xl">{formData.icon}</span>
                <p className="text-sm text-gray-500 mt-1">Selected icon</p>
              </div>
            </div>

            {/* Temperature */}
            <div>
              <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-1">
                Temperature Setting
              </label>
              <select
                id="temperature"
                name="temperature"
                value={formData.temperature}
                onChange={handleTemperatureChange}
                className="select-field"
              >
                {temperaturePresets.map((preset) => (
                  <option key={preset.value} value={preset.value}>
                    {preset.icon} {preset.label} {preset.value !== 'custom' ? `(${preset.value})` : ''}
                  </option>
                ))}
              </select>
              
              {formData.temperature === 'custom' && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter custom temperature (e.g., 15°C, -5°F)"
                    value={customTemp}
                    onChange={(e) => setCustomTemp(e.target.value)}
                    className={`input-field ${errors.temperature ? 'border-red-500' : ''}`}
                  />
                </div>
              )}
              {errors.temperature && <p className="text-red-500 text-sm mt-1">{errors.temperature}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="input-field resize-none"
                placeholder="Additional notes about this storage location..."
              />
            </div>

            {/* Preview */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{formData.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{formData.name || 'Location Name'}</p>
                  <p className="text-sm text-gray-500">
                    {formData.temperature === 'custom' ? customTemp || 'Custom temperature' : formData.temperature}
                  </p>
                  {formData.description && (
                    <p className="text-xs text-gray-400 mt-1">{formData.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
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
                {location ? 'Update Location' : 'Add Location'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}