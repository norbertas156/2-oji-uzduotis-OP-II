import React, { useState } from 'react'
import { 
  Settings as SettingsIcon,
  Bell,
  Download,
  Upload,
  Trash2,
  Save,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { useFridge } from '../context/FridgeContext'

export default function Settings() {
  const { items, storageLocations } = useFridge()
  const [notifications, setNotifications] = useState({
    expiring: true,
    expired: true,
    lowStock: false,
    daysBefore: 3
  })
  const [exportMessage, setExportMessage] = useState('')
  const [importMessage, setImportMessage] = useState('')

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleExport = () => {
    const data = {
      items,
      storageLocations,
      exportDate: new Date().toISOString(),
      version: '1.0'
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `smart-fridge-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setExportMessage('Data exported successfully!')
    setTimeout(() => setExportMessage(''), 3000)
  }

  const handleImport = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        
        if (data.items && data.storageLocations) {
          localStorage.setItem('fridgeData', JSON.stringify({
            items: data.items,
            storageLocations: data.storageLocations
          }))
          
          setImportMessage('Data imported successfully! Please refresh the page.')
          setTimeout(() => setImportMessage(''), 5000)
        } else {
          setImportMessage('Invalid file format. Please select a valid backup file.')
          setTimeout(() => setImportMessage(''), 3000)
        }
      } catch (error) {
        setImportMessage('Error reading file. Please check the file format.')
        setTimeout(() => setImportMessage(''), 3000)
      }
    }
    reader.readAsText(file)
    
    // Reset file input
    event.target.value = ''
  }

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      if (window.confirm('This will delete all your items and storage locations. Are you absolutely sure?')) {
        localStorage.removeItem('fridgeData')
        window.location.reload()
      }
    }
  }

  const stats = {
    totalItems: items.length,
    totalLocations: storageLocations.length,
    categories: [...new Set(items.map(item => item.category))].length,
    dataSize: Math.round(JSON.stringify({ items, storageLocations }).length / 1024)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Configure your Smart Fridge application preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Expiring Items</p>
                <p className="text-sm text-gray-500">Get notified about items expiring soon</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.expiring}
                  onChange={(e) => handleNotificationChange('expiring', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Expired Items</p>
                <p className="text-sm text-gray-500">Get notified about expired items</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.expired}
                  onChange={(e) => handleNotificationChange('expired', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Low Stock</p>
                <p className="text-sm text-gray-500">Get notified when items are running low</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.lowStock}
                  onChange={(e) => handleNotificationChange('lowStock', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div>
              <label htmlFor="daysBefore" className="block text-sm font-medium text-gray-700 mb-2">
                Days before expiration to notify
              </label>
              <select
                id="daysBefore"
                value={notifications.daysBefore}
                onChange={(e) => handleNotificationChange('daysBefore', parseInt(e.target.value))}
                className="select-field"
              >
                <option value={1}>1 day</option>
                <option value={2}>2 days</option>
                <option value={3}>3 days</option>
                <option value={5}>5 days</option>
                <option value={7}>1 week</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <SettingsIcon className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Data Management</h2>
          </div>
          
          <div className="space-y-4">
            {/* Export Data */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Export Data</h3>
              <p className="text-sm text-gray-500 mb-3">
                Download a backup of all your items and storage locations
              </p>
              <button
                onClick={handleExport}
                className="btn-primary flex items-center space-x-2 w-full justify-center"
              >
                <Download size={16} />
                <span>Export Backup</span>
              </button>
              {exportMessage && (
                <div className="mt-2 flex items-center space-x-1 text-green-600">
                  <CheckCircle size={16} />
                  <span className="text-sm">{exportMessage}</span>
                </div>
              )}
            </div>

            {/* Import Data */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Import Data</h3>
              <p className="text-sm text-gray-500 mb-3">
                Restore data from a backup file
              </p>
              <label className="btn-secondary flex items-center space-x-2 w-full justify-center cursor-pointer">
                <Upload size={16} />
                <span>Import Backup</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              {importMessage && (
                <div className={`mt-2 flex items-center space-x-1 ${
                  importMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {importMessage.includes('successfully') ? (
                    <CheckCircle size={16} />
                  ) : (
                    <AlertTriangle size={16} />
                  )}
                  <span className="text-sm">{importMessage}</span>
                </div>
              )}
            </div>

            {/* Clear Data */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Clear All Data</h3>
              <p className="text-sm text-gray-500 mb-3">
                Permanently delete all items and storage locations
              </p>
              <button
                onClick={handleClearData}
                className="btn-danger flex items-center space-x-2 w-full justify-center"
              >
                <Trash2 size={16} />
                <span>Clear All Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Statistics */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">{stats.totalItems}</div>
            <div className="text-sm text-gray-600">Items</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">{stats.totalLocations}</div>
            <div className="text-sm text-gray-600">Locations</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">{stats.categories}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">{stats.dataSize}</div>
            <div className="text-sm text-gray-600">KB stored</div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">About Smart Fridge</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            <strong>Version:</strong> 1.0.0
          </p>
          <p>
            <strong>Description:</strong> A smart kitchen inventory management system that helps you track your food items, 
            get recipe recommendations, and manage expiration dates across multiple storage locations.
          </p>
          <p>
            <strong>Features:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Track food inventory with expiration dates</li>
            <li>Manage multiple storage locations (fridge, freezer, pantry, etc.)</li>
            <li>Get recipe recommendations based on available ingredients</li>
            <li>Expiration alerts and notifications</li>
            <li>Data export and import capabilities</li>
            <li>Beautiful and intuitive user interface</li>
          </ul>
          <p className="text-xs text-gray-500 mt-4">
            Data is stored locally in your browser. No personal information is sent to external servers.
          </p>
        </div>
      </div>
    </div>
  )
}