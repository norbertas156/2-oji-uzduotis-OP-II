import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Package,
  ChefHat,
  ShoppingCart,
  Calendar,
  DollarSign,
  Zap,
  ArrowRight,
  Plus,
  Eye
} from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { useApp } from '../context/AppContext';
import { getItemStatus } from '../context/AppContext';

function Dashboard() {
  const { 
    items, 
    itemStats, 
    compatibleRecipes, 
    locations, 
    shoppingList,
    setModal,
    setSelectedItem,
    setSelectedRecipe
  } = useApp();

  const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const averageShelfLife = items.reduce((sum, item) => {
    const daysLeft = differenceInDays(new Date(item.expirationDate), new Date());
    return sum + Math.max(0, daysLeft);
  }, 0) / items.length;

  const recentItems = items
    .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
    .slice(0, 5);

  const expiringItems = items
    .filter(item => getItemStatus(item) === 'expiring')
    .sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate))
    .slice(0, 3);

  const topRecipes = compatibleRecipes.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 rounded-sharp-lg p-6 text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Chef! 👨‍🍳</h1>
          <p className="text-primary-100 text-lg">
            You have {items.length} items in your smart fridge. Let's make something delicious!
          </p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Total Items */}
        <motion.div variants={itemVariants} className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{items.length}</p>
              <p className="text-sm text-success-600 dark:text-success-400 flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% from last week
              </p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-sharp-lg">
              <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </motion.div>

        {/* Fresh Items */}
        <motion.div variants={itemVariants} className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Fresh Items</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{itemStats.fresh}</p>
              <p className="text-sm text-success-600 dark:text-success-400 flex items-center mt-2">
                <CheckCircle className="w-4 h-4 mr-1" />
                Looking good!
              </p>
            </div>
            <div className="p-3 bg-success-100 dark:bg-success-900/30 rounded-sharp-lg">
              <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-400" />
            </div>
          </div>
        </motion.div>

        {/* Expiring Soon */}
        <motion.div variants={itemVariants} className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Expiring Soon</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{itemStats.expiring}</p>
              <p className="text-sm text-warning-600 dark:text-warning-400 flex items-center mt-2">
                <Clock className="w-4 h-4 mr-1" />
                Use within 2 days
              </p>
            </div>
            <div className="p-3 bg-warning-100 dark:bg-warning-900/30 rounded-sharp-lg">
              <Clock className="w-6 h-6 text-warning-600 dark:text-warning-400" />
            </div>
          </div>
        </motion.div>

        {/* Total Value */}
        <motion.div variants={itemVariants} className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalValue.toFixed(2)}</p>
              <p className="text-sm text-primary-600 dark:text-primary-400 flex items-center mt-2">
                <DollarSign className="w-4 h-4 mr-1" />
                Avg shelf life: {averageShelfLife.toFixed(0)} days
              </p>
            </div>
            <div className="p-3 bg-accent-100 dark:bg-accent-900/30 rounded-sharp-lg">
              <DollarSign className="w-6 h-6 text-accent-600 dark:text-accent-400" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Items */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Items</h2>
            <button
              onClick={() => window.location.href = '/inventory'}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center"
            >
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-sharp-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setSelectedItem(item)}
              >
                <div className="text-2xl">{item.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.quantity} {item.unit} • Added {format(new Date(item.purchaseDate), 'MMM d')}
                  </p>
                </div>
                <span
                  className={`
                    px-2 py-1 text-xs font-medium rounded-sharp border
                    ${getItemStatus(item) === 'fresh' ? 'status-fresh' : ''}
                    ${getItemStatus(item) === 'expiring' ? 'status-expiring' : ''}
                    ${getItemStatus(item) === 'expired' ? 'status-expired' : ''}
                  `}
                >
                  {getItemStatus(item)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="card p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setModal('addItem')}
              className="w-full flex items-center space-x-3 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-sharp-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
            >
              <Plus className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-primary-700 dark:text-primary-300 font-medium">Add New Item</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/recipes'}
              className="w-full flex items-center space-x-3 p-4 bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded-sharp-lg hover:bg-accent-100 dark:hover:bg-accent-900/30 transition-colors"
            >
              <ChefHat className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              <span className="text-accent-700 dark:text-accent-300 font-medium">Find Recipes</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/shopping'}
              className="w-full flex items-center space-x-3 p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-sharp-lg hover:bg-success-100 dark:hover:bg-success-900/30 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-success-600 dark:text-success-400" />
              <span className="text-success-700 dark:text-success-300 font-medium">Shopping List</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setModal('scanBarcode')}
              className="w-full flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sharp-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Zap className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">Scan Barcode</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expiring Items Alert */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-warning-100 dark:bg-warning-900/30 rounded-sharp-lg">
              <AlertTriangle className="w-5 h-5 text-warning-600 dark:text-warning-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Expiring Soon</h2>
          </div>
          
          {expiringItems.length > 0 ? (
            <div className="space-y-3">
              {expiringItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-warning-50 dark:bg-warning-900/20 rounded-sharp-lg"
                >
                  <div className="text-xl">{item.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-warning-600 dark:text-warning-400">
                      Expires {format(new Date(item.expirationDate), 'MMM d')}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="p-2 text-warning-600 dark:text-warning-400 hover:bg-warning-100 dark:hover:bg-warning-900/40 rounded-sharp transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-success-500 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">All items are fresh!</p>
            </div>
          )}
        </motion.div>

        {/* Recipe Suggestions */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recipe Suggestions</h2>
            <button
              onClick={() => window.location.href = '/recipes'}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center"
            >
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {topRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-sharp-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{recipe.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {recipe.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {recipe.cookTime} • {recipe.servings} servings
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                      {recipe.compatibility}%
                    </div>
                    <div className="text-xs text-gray-500">match</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;