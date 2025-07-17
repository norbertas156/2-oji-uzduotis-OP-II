import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  AlertTriangle,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter
} from 'lucide-react'
import { useFridge } from '../context/FridgeContext'

export default function Analytics() {
  const { analytics, items, getItemsByCategory } = useFridge()
  
  const categoryData = getItemsByCategory()
  const chartData = Object.entries(categoryData).map(([category, items]) => ({
    category,
    count: items.length,
    value: items.reduce((sum, item) => sum + (item.costPerUnit || 0), 0)
  }))

  const insightCards = [
    {
      title: 'Cost Efficiency',
      value: `${analytics.wasteReduction}%`,
      description: 'Waste reduction compared to industry average',
      trend: '+12%',
      color: 'success',
      icon: TrendingUp
    },
    {
      title: 'Average Item Lifespan',
      value: `${analytics.avgItemLifespan} days`,
      description: 'From purchase to expiration',
      trend: '+3 days',
      color: 'primary',
      icon: Calendar
    },
    {
      title: 'Inventory Turnover',
      value: '2.4x',
      description: 'Items consumed per month',
      trend: '+0.3x',
      color: 'accent',
      icon: Package
    },
    {
      title: 'Loss Prevention',
      value: `$${analytics.expiredValue.toFixed(2)}`,
      description: 'Value of expired items this month',
      trend: '-$12.30',
      color: 'warning',
      icon: AlertTriangle
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Analytics Dashboard</h1>
            <p className="page-subtitle">
              Advanced insights and performance metrics for your kitchen operations
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn-ghost">
              <Filter size={16} className="mr-2" />
              Filters
            </button>
            <button className="btn-secondary">
              <Download size={16} className="mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insightCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-elevated p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${card.color}-100`}>
                <card.icon className={`w-6 h-6 text-${card.color}-600`} />
              </div>
              <span className="text-sm font-medium text-success-600">{card.trend}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{card.value}</h3>
            <p className="text-sm text-slate-600 mb-1">{card.title}</p>
            <p className="text-xs text-slate-400">{card.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="section-header">
            <h2 className="text-lg font-semibold text-slate-900">Category Distribution</h2>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <PieChart size={16} />
              <span>By item count</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {chartData.map((category, index) => {
              const percentage = (category.count / items.length) * 100
              const colors = ['bg-primary-500', 'bg-accent-500', 'bg-success-500', 'bg-warning-500', 'bg-danger-500']
              
              return (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">{category.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-500">{category.count} items</span>
                      <span className="text-sm font-medium text-slate-900">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                      className={`h-2 rounded-full ${colors[index % colors.length]}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Value Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="section-header">
            <h2 className="text-lg font-semibold text-slate-900">Value Analysis</h2>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <BarChart3 size={16} />
              <span>By category value</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {chartData
              .sort((a, b) => b.value - a.value)
              .map((category, index) => {
              const maxValue = Math.max(...chartData.map(c => c.value))
              const percentage = (category.value / maxValue) * 100
              const colors = ['bg-gradient-to-r from-primary-500 to-primary-600', 'bg-gradient-to-r from-accent-500 to-accent-600', 'bg-gradient-to-r from-success-500 to-success-600']
              
              return (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">{category.category}</span>
                    <span className="text-sm font-bold text-slate-900">${category.value.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                      className={`h-3 rounded-full ${colors[index % colors.length]}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Performance Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <div className="section-header">
          <h2 className="text-lg font-semibold text-slate-900">Performance Trends</h2>
          <div className="flex items-center space-x-2">
            <button className="btn-ghost btn-sm">Last 30 days</button>
            <button className="btn-ghost btn-sm">Last 90 days</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="text-center p-6 bg-slate-50 rounded-xl">
            <div className="text-3xl font-bold text-primary-600 mb-2">85%</div>
            <div className="text-sm text-slate-600 mb-1">Inventory Accuracy</div>
            <div className="text-xs text-slate-400">+5% from last month</div>
          </div>
          <div className="text-center p-6 bg-slate-50 rounded-xl">
            <div className="text-3xl font-bold text-success-600 mb-2">92%</div>
            <div className="text-sm text-slate-600 mb-1">Utilization Rate</div>
            <div className="text-xs text-slate-400">+3% from last month</div>
          </div>
          <div className="text-center p-6 bg-slate-50 rounded-xl">
            <div className="text-3xl font-bold text-accent-600 mb-2">4.2</div>
            <div className="text-sm text-slate-600 mb-1">Avg. Rating</div>
            <div className="text-xs text-slate-400">Recipe satisfaction</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}