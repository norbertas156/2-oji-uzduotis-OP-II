import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  Package,
  ChefHat,
  MapPin,
  ShoppingCart,
  BarChart3,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  User,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Recipes', href: '/recipes', icon: ChefHat },
  { name: 'Locations', href: '/locations', icon: MapPin },
  { name: 'Shopping List', href: '/shopping', icon: ShoppingCart },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

function Sidebar() {
  const { ui, theme, itemStats, toggleSidebar, toggleTheme } = useApp();
  const { sidebarOpen } = ui;

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.div
          initial={{ x: sidebarOpen ? 0 : -320 }}
          animate={{ x: sidebarOpen ? 0 : -320 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={`
            fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800
            lg:relative lg:translate-x-0 lg:block
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:w-20'}
          `}
        >
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-sharp-lg flex items-center justify-center shadow-sharp-md">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full animate-pulse-glow" />
                </div>
                <div className={`${sidebarOpen ? 'block' : 'hidden lg:hidden'}`}>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">SmartFridge</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ultimate Edition</p>
                </div>
              </motion.div>
              
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-sharp-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5 text-gray-500" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>

            {/* Stats Overview */}
            <div className={`p-6 border-b border-gray-200 dark:border-gray-800 ${sidebarOpen ? 'block' : 'hidden lg:hidden'}`}>
              <div className="grid grid-cols-3 gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 bg-success-50 dark:bg-success-900/20 rounded-sharp-lg border border-success-200 dark:border-success-800"
                >
                  <div className="text-lg font-bold text-success-700 dark:text-success-300">{itemStats.fresh}</div>
                  <div className="text-xs text-success-600 dark:text-success-400">Fresh</div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 bg-warning-50 dark:bg-warning-900/20 rounded-sharp-lg border border-warning-200 dark:border-warning-800"
                >
                  <div className="text-lg font-bold text-warning-700 dark:text-warning-300">{itemStats.expiring}</div>
                  <div className="text-xs text-warning-600 dark:text-warning-400">Expiring</div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 bg-danger-50 dark:bg-danger-900/20 rounded-sharp-lg border border-danger-200 dark:border-danger-800"
                >
                  <div className="text-lg font-bold text-danger-700 dark:text-danger-300">{itemStats.expired}</div>
                  <div className="text-xs text-danger-600 dark:text-danger-400">Expired</div>
                </motion.div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const isActive = window.location.pathname === item.href;
                
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      sidebar-nav group relative
                      ${isActive ? 'active' : ''}
                      ${sidebarOpen ? 'justify-start' : 'justify-center lg:justify-center'}
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'} group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors`} />
                    <span className={`${sidebarOpen ? 'block' : 'hidden lg:hidden'} font-medium`}>
                      {item.name}
                    </span>
                    
                    {/* Tooltip for collapsed state */}
                    {!sidebarOpen && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-sharp opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                        {item.name}
                      </div>
                    )}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute right-0 w-1 h-6 bg-primary-500 rounded-full"
                      />
                    )}
                  </motion.a>
                );
              })}
            </nav>

            {/* Theme Toggle & User Profile */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`
                  w-full flex items-center space-x-3 p-3 rounded-sharp-lg
                  bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-all duration-200
                  ${sidebarOpen ? 'justify-start' : 'justify-center lg:justify-center'}
                `}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
                <span className={`${sidebarOpen ? 'block' : 'hidden lg:hidden'} font-medium text-gray-700 dark:text-gray-300`}>
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </span>
              </motion.button>

              {/* User Profile */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`
                  flex items-center space-x-3 p-3 rounded-sharp-lg
                  bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20
                  border border-primary-200 dark:border-primary-800
                  ${sidebarOpen ? 'justify-start' : 'justify-center lg:justify-center'}
                `}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-sharp">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-500 rounded-full border-2 border-white dark:border-gray-900" />
                </div>
                <div className={`${sidebarOpen ? 'block' : 'hidden lg:hidden'} flex-1 min-w-0`}>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Kitchen Chef</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Premium User</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default Sidebar;