import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Bell,
  Plus,
  Filter,
  Grid3X3,
  List,
  MoreVertical,
  AlertTriangle,
  Clock,
  CheckCircle,
  Menu
} from 'lucide-react';
import { useApp } from '../context/AppContext';

function TopBar({ title, showFilters = false, onAddClick, breadcrumbs = [] }) {
  const { 
    ui, 
    filters, 
    itemStats, 
    setFilter, 
    clearFilters, 
    setViewMode,
    setModal,
    toggleSidebar 
  } = useApp();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Items Expiring Soon',
      message: `${itemStats.expiring} items are expiring within 2 days`,
      time: '2 minutes ago',
      icon: Clock,
      color: 'warning'
    },
    {
      id: 2,
      type: 'danger',
      title: 'Expired Items',
      message: `${itemStats.expired} items have expired`,
      time: '1 hour ago',
      icon: AlertTriangle,
      color: 'danger'
    },
    {
      id: 3,
      type: 'success',
      title: 'Inventory Updated',
      message: 'Successfully added 3 new items to your fridge',
      time: '3 hours ago',
      icon: CheckCircle,
      color: 'success'
    }
  ];

  const quickActions = [
    { name: 'Add Item', action: () => setModal('addItem'), icon: Plus },
    { name: 'Add Location', action: () => setModal('addLocation'), icon: Plus },
    { name: 'Scan Barcode', action: () => setModal('scanBarcode'), icon: Search },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-sharp-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5 text-gray-500" />
          </button>

          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2">
            {breadcrumbs.length > 0 ? (
              <nav className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <span className="text-gray-400">/</span>}
                    <span
                      className={
                        index === breadcrumbs.length - 1
                          ? 'text-gray-900 dark:text-gray-100 font-medium'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer'
                      }
                    >
                      {item}
                    </span>
                  </React.Fragment>
                ))}
              </nav>
            ) : (
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            )}
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search items, recipes, locations..."
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sharp-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          {showFilters && (
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-sharp-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-sharp ${
                  ui.viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-700 shadow-sharp text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-sharp ${
                  ui.viewMode === 'list'
                    ? 'bg-white dark:bg-gray-700 shadow-sharp text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Filters */}
          {showFilters && (
            <div className="relative">
              <button className="btn-secondary">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          )}

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 bg-gray-100 dark:bg-gray-800 rounded-sharp-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {(itemStats.expiring > 0 || itemStats.expired > 0) && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse-glow">
                  {itemStats.expiring + itemStats.expired}
                </span>
              )}
            </motion.button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-sharp-lg shadow-sharp-xl border border-gray-200 dark:border-gray-800 z-50"
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <motion.div
                        key={notification.id}
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                        className="p-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`
                            p-2 rounded-sharp-lg
                            ${notification.color === 'warning' ? 'bg-warning-100 dark:bg-warning-900/30' : ''}
                            ${notification.color === 'danger' ? 'bg-danger-100 dark:bg-danger-900/30' : ''}
                            ${notification.color === 'success' ? 'bg-success-100 dark:bg-success-900/30' : ''}
                          `}>
                            <Icon className={`w-4 h-4
                              ${notification.color === 'warning' ? 'text-warning-600 dark:text-warning-400' : ''}
                              ${notification.color === 'danger' ? 'text-danger-600 dark:text-danger-400' : ''}
                              ${notification.color === 'success' ? 'text-success-600 dark:text-success-400' : ''}
                            `} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </motion.button>

            {/* Quick Actions Dropdown */}
            {showQuickActions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-sharp-lg shadow-sharp-xl border border-gray-200 dark:border-gray-800 z-50"
              >
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                      onClick={() => {
                        action.action();
                        setShowQuickActions(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 first:rounded-t-sharp-lg last:rounded-b-sharp-lg"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{action.name}</span>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* More Options */}
          <button className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-sharp-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 flex items-center space-x-4"
        >
          <select
            value={filters.location}
            onChange={(e) => setFilter('location', e.target.value)}
            className="input text-sm py-2"
          >
            <option value="">All Locations</option>
            <option value="fridge">Fridge</option>
            <option value="freezer">Freezer</option>
            <option value="pantry">Pantry</option>
            <option value="counter">Counter</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilter('category', e.target.value)}
            className="input text-sm py-2"
          >
            <option value="">All Categories</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="dairy">Dairy</option>
            <option value="meat">Meat</option>
            <option value="bakery">Bakery</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilter('status', e.target.value)}
            className="input text-sm py-2"
          >
            <option value="">All Status</option>
            <option value="fresh">Fresh</option>
            <option value="expiring">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>

          {(filters.location || filters.category || filters.status) && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              Clear Filters
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default TopBar;