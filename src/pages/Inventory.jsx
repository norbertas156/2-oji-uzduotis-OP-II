import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Calendar,
  Package,
  AlertTriangle,
  Clock
} from 'lucide-react'
import { useFridge } from '../context/FridgeContext'
import { getExpirationStatus } from '../context/FridgeContext'
import { format } from 'date-fns'
import ItemModal from '../components/ItemModal'

export default function Inventory() {
  const { 
    items, 
    storageLocations, 
    deleteItem,
    getItemsByCategory 
  } = useFridge()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  // Get unique categories
  const categories = [...new Set(items.map(item => item.category))]

  // Filter and sort items
  const filteredItems = items
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLocation = !selectedLocation || item.location === selectedLocation
      const matchesCategory = !selectedCategory || item.category === selectedCategory
      return matchesSearch && matchesLocation && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'expiration':
          return new Date(a.expirationDate) - new Date(b.expirationDate)
        case 'quantity':
          return b.quantity - a.quantity
        case 'category':
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

  const handleEdit = (item) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(id)
    }
  }

  const handleAdd = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const getExpirationColor = (status) => {
    switch (status.color) {
      case 'danger':
        return 'text-red-600 bg-red-100'
      case 'warning':
        return 'text-yellow-600 bg-yellow-100'
      case 'success':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getExpirationIcon = (status) => {
    switch (status.status) {
      case 'expired':
        return <AlertTriangle size={16} />
      case 'expiring-soon':
      case 'expiring-this-week':
        return <Clock size={16} />
      default:
        return <Calendar size={16} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-600 mt-1">
            Manage your food items and track expiration dates
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Item</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Location Filter */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="select-field"
          >
            <option value="">All Locations</option>
            {storageLocations.map(location => (
              <option key={location.id} value={location.id}>
                {location.icon} {location.name}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select-field"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select-field"
          >
            <option value="name">Sort by Name</option>
            <option value="expiration">Sort by Expiration</option>
            <option value="quantity">Sort by Quantity</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const location = storageLocations.find(loc => loc.id === item.location)
          const expirationStatus = getExpirationStatus(item.expirationDate)
          
          return (
            <div key={item.id} className="card hover:shadow-xl transition-shadow group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{item.image}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {/* Quantity */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <span className="font-medium">
                    {item.quantity} {item.unit}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Location:</span>
                  <span className="flex items-center space-x-1">
                    <span>{location?.icon}</span>
                    <span className="text-sm">{location?.name}</span>
                  </span>
                </div>

                {/* Purchase Date */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Purchased:</span>
                  <span className="text-sm">
                    {format(new Date(item.purchaseDate), 'MMM dd, yyyy')}
                  </span>
                </div>

                {/* Expiration Date */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Expires:</span>
                  <span className={`text-sm px-2 py-1 rounded-full flex items-center space-x-1 ${getExpirationColor(expirationStatus)}`}>
                    {getExpirationIcon(expirationStatus)}
                    <span>{format(new Date(item.expirationDate), 'MMM dd')}</span>
                  </span>
                </div>

                {/* Expiration Status */}
                <div className="pt-2 border-t border-gray-100">
                  <div className={`text-xs px-2 py-1 rounded-full inline-flex items-center space-x-1 ${getExpirationColor(expirationStatus)}`}>
                    {expirationStatus.status === 'expired' && (
                      <span>Expired {expirationStatus.days} days ago</span>
                    )}
                    {expirationStatus.status === 'expiring-soon' && (
                      <span>Expires in {expirationStatus.days} days</span>
                    )}
                    {expirationStatus.status === 'expiring-this-week' && (
                      <span>Expires in {expirationStatus.days} days</span>
                    )}
                    {expirationStatus.status === 'fresh' && (
                      <span>Fresh for {expirationStatus.days} days</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {items.length === 0 ? 'No items in your inventory' : 'No items match your filters'}
          </h3>
          <p className="text-gray-500 mb-4">
            {items.length === 0 
              ? 'Start by adding some items to track your food inventory.'
              : 'Try adjusting your search or filter criteria.'
            }
          </p>
          {items.length === 0 && (
            <button onClick={handleAdd} className="btn-primary">
              Add Your First Item
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <ItemModal
          item={editingItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}