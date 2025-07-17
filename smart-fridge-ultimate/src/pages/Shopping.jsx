import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, ShoppingCart, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Shopping() {
  const { shoppingList, removeFromShoppingList, clearShoppingList, addToShoppingList } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  if (shoppingList.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Shopping list is empty</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Add items from your inventory or create new ones
          </p>
          <button
            onClick={() => addToShoppingList({
              name: 'New Item',
              emoji: '🛒',
              category: 'Other',
              quantity: 1,
              unit: 'piece',
              notes: 'Add details'
            })}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping List</h2>
          <p className="text-gray-500 dark:text-gray-400">{shoppingList.length} items to buy</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => addToShoppingList({
              name: 'New Item',
              emoji: '🛒',
              category: 'Other',
              quantity: 1,
              unit: 'piece',
              notes: 'Add details'
            })}
            className="btn-secondary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </button>
          
          <button
            onClick={() => {
              if (window.confirm('Clear entire shopping list?')) {
                clearShoppingList();
              }
            }}
            className="btn-danger"
          >
            Clear All
          </button>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {shoppingList.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="card p-4 flex items-center space-x-4"
          >
            <div className="text-2xl">{item.emoji}</div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {item.name}
              </h3>
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span>{item.quantity} {item.unit}</span>
                <span>{item.category}</span>
                {item.notes && <span>• {item.notes}</span>}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  // Mark as purchased - could add to inventory
                  removeFromShoppingList(item.id);
                }}
                className="p-2 text-success-600 dark:text-success-400 hover:bg-success-100 dark:hover:bg-success-900/30 rounded-sharp transition-colors"
                title="Mark as purchased"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => removeFromShoppingList(item.id)}
                className="p-2 text-danger-600 dark:text-danger-400 hover:bg-danger-100 dark:hover:bg-danger-900/30 rounded-sharp transition-colors"
                title="Remove from list"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Shopping;