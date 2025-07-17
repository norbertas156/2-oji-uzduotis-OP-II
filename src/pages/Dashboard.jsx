import React from 'react'
import { 
  AlertTriangle, 
  Clock, 
  Package, 
  Plus,
  ChefHat,
  TrendingUp,
  Calendar
} from 'lucide-react'
import { useFridge } from '../context/FridgeContext'
import { getExpirationStatus } from '../context/FridgeContext'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { 
    items, 
    storageLocations, 
    getExpiringItems, 
    getExpiredItems,
    getRecipeRecommendations
  } = useFridge()

  const expiringItems = getExpiringItems(7)
  const expiredItems = getExpiredItems()
  const recipes = getRecipeRecommendations().slice(0, 3)

  const stats = [
    {
      name: 'Total Items',
      value: items.length,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Expiring Soon',
      value: expiringItems.length,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      name: 'Expired Items',
      value: expiredItems.length,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      name: 'Storage Locations',
      value: storageLocations.length,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening in your kitchen.
          </p>
        </div>
        <Link
          to="/inventory"
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Item</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Storage Overview */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Storage Overview</h2>
            <Link to="/locations" className="text-primary-600 hover:text-primary-700 text-sm">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {storageLocations.map((location) => {
              const locationItems = items.filter(item => item.location === location.id)
              return (
                <div key={location.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{location.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{location.name}</p>
                      <p className="text-sm text-gray-500">{location.temperature}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{locationItems.length}</p>
                    <p className="text-sm text-gray-500">items</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Expiration Alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Expiration Alerts</h2>
            <Link to="/inventory" className="text-primary-600 hover:text-primary-700 text-sm">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {expiredItems.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <h3 className="text-sm font-medium text-red-800 mb-2">Expired Items</h3>
                {expiredItems.slice(0, 3).map((item) => {
                  const status = getExpirationStatus(item.expirationDate)
                  return (
                    <div key={item.id} className="flex items-center space-x-2 text-sm text-red-700">
                      <span>{item.image}</span>
                      <span>{item.name}</span>
                      <span className="text-xs">({status.days} days ago)</span>
                    </div>
                  )
                })}
              </div>
            )}
            
            {expiringItems.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">Expiring Soon</h3>
                {expiringItems.slice(0, 3).map((item) => {
                  const status = getExpirationStatus(item.expirationDate)
                  return (
                    <div key={item.id} className="flex items-center space-x-2 text-sm text-yellow-700">
                      <span>{item.image}</span>
                      <span>{item.name}</span>
                      <span className="text-xs">({status.days} days left)</span>
                    </div>
                  )
                })}
              </div>
            )}

            {expiredItems.length === 0 && expiringItems.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>All items are fresh! 🎉</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recipe Recommendations */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recipe Recommendations</h2>
          <Link to="/recipes" className="text-primary-600 hover:text-primary-700 text-sm">
            View all recipes
          </Link>
        </div>
        
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{recipe.image}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{recipe.name}</h3>
                    <p className="text-sm text-gray-500">{recipe.time} • {recipe.difficulty}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Available ingredients:</span>
                    <span className="font-medium text-green-600">
                      {recipe.availableIngredients}/{recipe.totalIngredients}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${recipe.compatibility}%` }}
                    ></div>
                  </div>
                  
                  {recipe.missingIngredients.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Missing:</p>
                      <div className="flex flex-wrap gap-1">
                        {recipe.missingIngredients.map((ingredient, index) => (
                          <span 
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {recipe.canMake && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        <ChefHat className="w-3 h-3 mr-1" />
                        Ready to cook!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <ChefHat className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Add some ingredients to get recipe recommendations!</p>
          </div>
        )}
      </div>
    </div>
  )
}