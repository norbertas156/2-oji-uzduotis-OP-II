import React, { useState } from 'react'
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  Menu,
  ChevronDown,
  MessageSquare,
  HelpCircle,
  LogOut
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFridge } from '../context/FridgeContext'

export default function TopBar({ onToggleSidebar }) {
  const { getExpiringItems, getExpiredItems } = useFridge()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const expiringItems = getExpiringItems(3)
  const expiredItems = getExpiredItems()
  const totalNotifications = expiringItems.length + expiredItems.length

  const notifications = [
    ...expiredItems.map(item => ({
      id: `expired-${item.id}`,
      type: 'error',
      title: 'Item Expired',
      message: `${item.name} expired`,
      time: '2 hours ago',
      urgent: true
    })),
    ...expiringItems.map(item => ({
      id: `expiring-${item.id}`,
      type: 'warning',
      title: 'Expiring Soon',
      message: `${item.name} expires in ${Math.ceil((new Date(item.expirationDate) - new Date()) / (1000 * 60 * 60 * 24))} days`,
      time: '1 hour ago',
      urgent: false
    }))
  ].slice(0, 5)

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Menu size={20} className="text-slate-600" />
          </button>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search inventory, recipes, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-64 lg:w-96"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <button className="btn-ghost btn-sm">
              <HelpCircle size={16} className="mr-1" />
              Help
            </button>
            <button className="btn-ghost btn-sm">
              <MessageSquare size={16} className="mr-1" />
              Feedback
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Bell size={20} className="text-slate-600" />
              {totalNotifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 bg-danger-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                >
                  {totalNotifications > 9 ? '9+' : totalNotifications}
                </motion.span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-hard border border-slate-200 z-50"
                >
                  <div className="p-4 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900">Notifications</h3>
                      <span className="text-xs text-slate-500">{totalNotifications} new</span>
                    </div>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto scrollbar-thin">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'error' ? 'bg-danger-500' : 'bg-warning-500'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-slate-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-500">
                        <Bell size={24} className="mx-auto mb-2 text-slate-300" />
                        <p className="text-sm">No new notifications</p>
                      </div>
                    )}
                  </div>
                  
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-slate-200">
                      <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                        View All Notifications
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <Settings size={20} className="text-slate-600" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-slate-900">Kitchen Manager</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-hard border border-slate-200 z-50"
                >
                  <div className="p-4 border-b border-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                        <User size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Kitchen Manager</p>
                        <p className="text-sm text-slate-500">manager@kitchen.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center space-x-2">
                      <User size={16} />
                      <span>Profile Settings</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center space-x-2">
                      <Settings size={16} />
                      <span>Preferences</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center space-x-2">
                      <HelpCircle size={16} />
                      <span>Help & Support</span>
                    </button>
                  </div>
                  
                  <div className="border-t border-slate-100 py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-danger-600 hover:bg-danger-50 transition-colors flex items-center space-x-2">
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}