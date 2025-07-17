import React, { useState } from 'react'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  MapPin,
  Thermometer,
  Package
} from 'lucide-react'
import { useFridge } from '../context/FridgeContext'
import LocationModal from '../components/LocationModal'

export default function StorageLocations() {
  const { 
    storageLocations, 
    items,
    deleteLocation,
    getItemsByLocation 
  } = useFridge()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLocation, setEditingLocation] = useState(null)

  const handleEdit = (location) => {
    setEditingLocation(location)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    const itemsInLocation = getItemsByLocation(id)
    if (itemsInLocation.length > 0) {
      alert(`Cannot delete this location. It contains ${itemsInLocation.length} item(s). Please move or remove the items first.`)
      return
    }

    if (window.confirm('Are you sure you want to delete this storage location?')) {
      deleteLocation(id)
    }
  }

  const handleAdd = () => {
    setEditingLocation(null)
    setIsModalOpen(true)
  }

  const getLocationStats = (locationId) => {
    const locationItems = getItemsByLocation(locationId)
    const categories = [...new Set(locationItems.map(item => item.category))]
    const totalQuantity = locationItems.reduce((sum, item) => sum + item.quantity, 0)
    
    return {
      itemCount: locationItems.length,
      categories: categories.length,
      totalQuantity,
      items: locationItems
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Storage Locations</h1>
          <p className="text-gray-600 mt-1">
            Manage your kitchen storage spaces and organize your inventory
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Location</span>
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {storageLocations.length}
          </div>
          <div className="text-sm text-gray-600">Total Locations</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {items.length}
          </div>
          <div className="text-sm text-gray-600">Total Items</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {[...new Set(items.map(item => item.category))].length}
          </div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {Math.round(items.length / storageLocations.length) || 0}
          </div>
          <div className="text-sm text-gray-600">Avg. per Location</div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storageLocations.map((location) => {
          const stats = getLocationStats(location.id)
          
          return (
            <div key={location.id} className="card hover:shadow-xl transition-shadow group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl">{location.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{location.name}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Thermometer size={14} />
                      <span>{location.temperature}</span>
                    </div>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  <button
                    onClick={() => handleEdit(location)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(location.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{stats.itemCount}</div>
                    <div className="text-xs text-gray-600">Items</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{stats.categories}</div>
                    <div className="text-xs text-gray-600">Categories</div>
                  </div>
                </div>

                {/* Recent Items */}
                {stats.items.length > 0 ? (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Items</h4>
                    <div className="space-y-2">
                      {stats.items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center space-x-2 text-sm">
                          <span className="text-lg">{item.image}</span>
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className="text-gray-500">
                            {item.quantity} {item.unit}
                          </span>
                        </div>
                      ))}
                      {stats.items.length > 3 && (
                        <div className="text-xs text-gray-500 text-center pt-1">
                          +{stats.items.length - 3} more items
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No items stored here</p>
                  </div>
                )}

                {/* Usage Bar */}
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Usage</span>
                    <span>{stats.itemCount} items</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        stats.itemCount === 0 ? 'bg-gray-300' :
                        stats.itemCount <= 5 ? 'bg-green-500' :
                        stats.itemCount <= 10 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((stats.itemCount / 15) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {storageLocations.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No storage locations
          </h3>
          <p className="text-gray-500 mb-4">
            Create your first storage location to start organizing your inventory.
          </p>
          <button onClick={handleAdd} className="btn-primary">
            Add Storage Location
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <LocationModal
          location={editingLocation}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}