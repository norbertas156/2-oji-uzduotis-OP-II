import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, Clock, Package, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Analytics() {
  const { items, itemStats, locations } = useApp();

  const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const averageItemValue = totalValue / items.length;
  
  const categoryStats = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const locationStats = locations.map(location => ({
    ...location,
    itemCount: items.filter(item => item.location === location.id).length
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Overview Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={itemVariants} className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalValue.toFixed(2)}</p>
              <p className="text-sm text-primary-600 dark:text-primary-400">
                Avg: ${averageItemValue.toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Waste Risk</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{itemStats.expired + itemStats.expiring}</p>
              <p className="text-sm text-warning-600 dark:text-warning-400">
                {((itemStats.expired + itemStats.expiring) / items.length * 100).toFixed(1)}%
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-warning-600 dark:text-warning-400" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Efficiency</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(itemStats.fresh / items.length * 100).toFixed(0)}%
              </p>
              <p className="text-sm text-success-600 dark:text-success-400">
                Fresh items
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-success-600 dark:text-success-400" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{items.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Active inventory
              </p>
            </div>
            <Package className="w-8 h-8 text-gray-600 dark:text-gray-400" />
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="card p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Items by Category
          </h3>
          <div className="space-y-4">
            {Object.entries(categoryStats)
              .sort(([,a], [,b]) => b - a)
              .map(([category, count]) => {
                const percentage = (count / items.length) * 100;
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {count} items ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-2 bg-primary-500 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>

        {/* Location Usage */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="card p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Storage Location Usage
          </h3>
          <div className="space-y-4">
            {locationStats
              .sort((a, b) => b.itemCount - a.itemCount)
              .map((location) => {
                const percentage = (location.itemCount / location.capacity) * 100;
                return (
                  <div key={location.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{location.emoji}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {location.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {location.itemCount}/{location.capacity} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-2 rounded-full ${
                          percentage > 90 ? 'bg-danger-500' :
                          percentage > 70 ? 'bg-warning-500' : 'bg-success-500'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>
      </div>

      {/* Freshness Overview */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="card p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Freshness Distribution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-success-50 dark:bg-success-900/20 rounded-sharp-lg">
            <div className="text-3xl font-bold text-success-600 dark:text-success-400 mb-2">
              {itemStats.fresh}
            </div>
            <div className="text-sm text-success-600 dark:text-success-400 font-medium">Fresh Items</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {(itemStats.fresh / items.length * 100).toFixed(1)}% of total
            </div>
          </div>
          
          <div className="text-center p-4 bg-warning-50 dark:bg-warning-900/20 rounded-sharp-lg">
            <div className="text-3xl font-bold text-warning-600 dark:text-warning-400 mb-2">
              {itemStats.expiring}
            </div>
            <div className="text-sm text-warning-600 dark:text-warning-400 font-medium">Expiring Soon</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {(itemStats.expiring / items.length * 100).toFixed(1)}% of total
            </div>
          </div>
          
          <div className="text-center p-4 bg-danger-50 dark:bg-danger-900/20 rounded-sharp-lg">
            <div className="text-3xl font-bold text-danger-600 dark:text-danger-400 mb-2">
              {itemStats.expired}
            </div>
            <div className="text-sm text-danger-600 dark:text-danger-400 font-medium">Expired</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {(itemStats.expired / items.length * 100).toFixed(1)}% of total
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Analytics;