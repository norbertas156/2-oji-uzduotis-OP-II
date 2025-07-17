import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package2, 
  ChefHat, 
  MapPin, 
  Settings, 
  BarChart3,
  ChevronLeft,
  Zap,
  Database
} from 'lucide-react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: LayoutDashboard, 
    description: 'Overview & Analytics',
    badge: null
  },
  { 
    name: 'Inventory', 
    href: '/inventory', 
    icon: Package2, 
    description: 'Item Management',
    badge: null
  },
  { 
    name: 'Analytics', 
    href: '/analytics', 
    icon: BarChart3, 
    description: 'Performance Insights',
    badge: 'Pro'
  },
  { 
    name: 'Recipes', 
    href: '/recipes', 
    icon: ChefHat, 
    description: 'Smart Recommendations',
    badge: null
  },
  { 
    name: 'Storage', 
    href: '/locations', 
    icon: MapPin, 
    description: 'Location Management',
    badge: null
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings, 
    description: 'System Configuration',
    badge: null
  },
]

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation()

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white border-r border-slate-200 flex flex-col"
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
        <motion.div
          initial={false}
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center space-x-3"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
            <Database size={18} className="text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-slate-900">Smart Fridge</h1>
              <p className="text-xs text-slate-500 -mt-1">Professional</p>
            </div>
          )}
        </motion.div>
        
        <button
          onClick={onToggle}
          className="hidden lg:flex w-6 h-6 items-center justify-center rounded hover:bg-slate-100 transition-colors"
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft size={16} className="text-slate-400" />
          </motion.div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          
          return (
            <motion.div
              key={item.name}
              whileHover={{ x: isActive ? 0 : 4 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={item.href}
                className={clsx(
                  'group relative flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 rounded-r"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className={clsx(
                  'flex items-center justify-center w-5 h-5 transition-colors duration-200',
                  collapsed ? 'mx-auto' : 'mr-3'
                )}>
                  <item.icon 
                    size={18} 
                    className={clsx(
                      'transition-colors duration-200',
                      isActive ? 'text-primary-600' : 'text-slate-500 group-hover:text-slate-700'
                    )}
                  />
                </div>
                
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{item.name}</span>
                      {item.badge && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-accent-100 text-accent-700 rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {item.description}
                    </p>
                  </div>
                )}
                
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-16 bg-slate-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    {item.name}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45" />
                  </div>
                )}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-200">
        {!collapsed ? (
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap size={16} className="text-primary-600" />
              <span className="text-sm font-medium text-primary-700">Pro Features</span>
            </div>
            <p className="text-xs text-primary-600 mb-3">
              Advanced analytics and insights for professional kitchen management.
            </p>
            <button className="w-full btn-primary btn-sm">
              Upgrade Plan
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100 flex items-center justify-center group">
              <Zap size={16} className="text-primary-600 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Version Info */}
      {!collapsed && (
        <div className="px-4 pb-4">
          <div className="text-center">
            <p className="text-xs text-slate-400">Smart Fridge Pro v2.0</p>
            <p className="text-xs text-slate-300">Enterprise Edition</p>
          </div>
        </div>
      )}
    </motion.aside>
  )
}