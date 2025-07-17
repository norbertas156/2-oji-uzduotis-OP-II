import React from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  Package, 
  DollarSign,
  Activity,
  ChefHat,
  Calendar,
  Target,
  BarChart3,
  PieChart,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useFridge } from '../context/FridgeContext'
import { getExpirationStatus } from '../context/FridgeContext'
import { format, startOfWeek, endOfWeek } from 'date-fns'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { 
    items, 
    storageLocations, 
    getExpiringItems, 
    getExpiredItems,
    getRecipeRecommendations,
    analytics,
    getWeeklyData
  } = useFridge()

  const expiringItems = getExpiringItems(7)
  const expiredItems = getExpiredItems()
  const recipes = getRecipeRecommendations().slice(0, 3)
  const weeklyData = getWeeklyData()

  const metrics = [
    {
      label: 'Total Inventory Value',
      value: `$${analytics.totalValue.toFixed(2)}`,
      change: +12.5,
      trend: 'up',
      icon: DollarSign,
      description: 'Current total value of all items',
      color: 'primary'
    },
    {
      label: 'Active Items',
      value: analytics.totalItems,
      change: +5,
      trend: 'up',
      icon: Package,
      description: 'Items currently in inventory',
      color: 'success'
    },
    {
      label: 'Waste Reduction',
      value: `${analytics.wasteReduction}%`,
      change: +8.2,
      trend: 'up',
      icon: TrendingUp,
      description: 'Efficiency improvement',
      color: 'accent'
    },
    {
      label: 'Expired Items',
      value: analytics.expiredItems,
      change: -15,
      trend: 'down',
      icon: AlertTriangle,
      description: 'Items requiring attention',
      color: 'warning'
    }
  ]

  const quickStats = [
    {
      label: 'This Week',
      items: [
        { label: 'Items Added', value: weeklyData.itemsAdded, icon: Package },
        { label: 'Categories', value: weeklyData.categories, icon: BarChart3 },
        { label: 'Value Added', value: `$${weeklyData.totalValue.toFixed(2)}`, icon: DollarSign }
      ]
    },
    {
      label: 'Expiration Alerts',
      items: [
        { label: 'Expired', value: expiredItems.length, icon: AlertTriangle, color: 'danger' },
        { label: 'Expiring Soon', value: expiringItems.length, icon: Clock, color: 'warning' },
        { label: 'Fresh Items', value: items.length - expiredItems.length - expiringItems.length, icon: Activity, color: 'success' }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Dashboard Overview</h1>
            <p className="page-subtitle">
              Professional kitchen management insights and analytics
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-slate-500">
              Last updated: {format(new Date(), 'MMM dd, yyyy HH:mm')}
            </div>
            <Link to="/analytics" className="btn-primary">
              <BarChart3 size={16} className="mr-2" />
              View Analytics
            </Link>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-elevated p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${metric.color}-100`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.trend === 'up' ? 'text-success-600' : 'text-danger-600'
              }`}>
                {metric.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span className="font-medium">{Math.abs(metric.change)}%</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</h3>
              <p className="text-sm text-slate-600 mb-2">{metric.label}</p>
              <p className="text-xs text-slate-400">{metric.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Storage Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <div className="section-header">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Storage Distribution</h2>
                <p className="text-sm text-slate-500">Current inventory across all locations</p>
              </div>
              <Link to="/locations" className="btn-ghost btn-sm">
                <Eye size={16} className="mr-1" />
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {storageLocations.map((location) => {
                const locationItems = items.filter(item => item.location === location.id)
                const utilizationPercentage = Math.min((locationItems.length / (location.capacity || 100)) * 100, 100)
                
                return (
                  <div key={location.id} className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{location.icon}</span>
                        <div>
                          <h3 className="font-medium text-slate-900">{location.name}</h3>
                          <p className="text-sm text-slate-500">{location.temperature}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">{locationItems.length}</p>
                        <p className="text-xs text-slate-500">items</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Utilization</span>
                        <span>{Math.round(utilizationPercentage)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            utilizationPercentage > 80 ? 'bg-danger-500' :
                            utilizationPercentage > 60 ? 'bg-warning-500' : 'bg-success-500'
                          }`}
                          style={{ width: `${utilizationPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Recipe Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <div className="section-header">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Smart Recipe Recommendations</h2>
                <p className="text-sm text-slate-500">AI-powered suggestions based on your inventory</p>
              </div>
              <Link to="/recipes" className="btn-ghost btn-sm">
                <ChefHat size={16} className="mr-1" />
                All Recipes
              </Link>
            </div>
            
            {recipes.length > 0 ? (
              <div className="space-y-4">
                {recipes.map((recipe, index) => (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{recipe.image}</span>
                      <div>
                        <h3 className="font-medium text-slate-900">{recipe.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                          <span>{recipe.time}</span>
                          <span>•</span>
                          <span>{recipe.difficulty}</span>
                          <span>•</span>
                          <span>by {recipe.chef}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-success-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${recipe.compatibility}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {Math.round(recipe.compatibility)}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {recipe.availableIngredients}/{recipe.totalIngredients} ingredients
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <ChefHat className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                <p>Add ingredients to get smart recommendations</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          {quickStats.map((section, sectionIndex) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + sectionIndex * 0.1 }}
              className="card p-6"
            >
              <h3 className="font-semibold text-slate-900 mb-4">{section.label}</h3>
              <div className="space-y-3">
                {section.items.map((item, index) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <item.icon 
                        size={16} 
                        className={`text-${item.color || 'slate'}-500`} 
                      />
                      <span className="text-sm text-slate-600">{item.label}</span>
                    </div>
                    <span className={`font-semibold ${
                      item.color ? `text-${item.color}-600` : 'text-slate-900'
                    }`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="card p-6"
          >
            <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {items.slice(0, 5).map((item, index) => {
                const status = getExpirationStatus(item.expirationDate)
                return (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full status-${status.color}`} />
                    <span className="text-2xl">{item.image}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Added {format(new Date(item.purchaseDate), 'MMM dd')}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="card p-6"
          >
            <h3 className="font-semibold text-slate-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Database</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-success-500" />
                  <span className="text-sm font-medium text-success-600">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Sync Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-success-500" />
                  <span className="text-sm font-medium text-success-600">Connected</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Last Backup</span>
                <span className="text-sm text-slate-500">2 hours ago</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}