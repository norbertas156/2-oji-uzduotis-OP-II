import React from 'react';
import { motion } from 'framer-motion';
import { 
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Package,
  DollarSign,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { useApp } from '../context/AppContext';
import { getItemStatus } from '../context/AppContext';

function Inventory() {
  const { 
    filteredItems, 
    ui, 
    locations,
    categories,
    setModal,
    setSelectedItem,
    deleteItem,
    addToShoppingList
  } = useApp();

  const getLocationName = (locationId) => {
    const location = locations.find(loc => loc.id === locationId);
    return location ? location.name : locationId;
  };

  const getLocationEmoji = (locationId) => {
    const location = locations.find(loc => loc.id === locationId);
    return location ? location.emoji : '📦';
  };

  const getDaysUntilExpiration = (expirationDate) => {
    return differenceInDays(new Date(expirationDate), new Date());
  };

  const handleDeleteItem = (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      deleteItem(item.id);
    }
  };

  const handleAddToShoppingList = (item) => {
    addToShoppingList({
      name: item.name,
      emoji: item.emoji,
      category: item.category,
      quantity: 1,
      unit: item.unit,
      notes: `Replenish ${item.name}`
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (filteredItems.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No items found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {filteredItems.length === 0 ? 'Start by adding some items to your fridge' : 'Try adjusting your search or filters'}
          </p>
          <button
            onClick={() => setModal('addItem')}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add First Item
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Items Grid/List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={
          ui.viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }
      >
        {filteredItems.map((item) => {
          const status = getItemStatus(item);
          const daysLeft = getDaysUntilExpiration(item.expirationDate);
          
          if (ui.viewMode === 'grid') {
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="card-hover p-6 relative overflow-hidden"
              >
                {/* Status indicator */}
                <div className={`
                  absolute top-0 right-0 w-full h-1
                  ${status === 'fresh' ? 'bg-success-500' : ''}
                  ${status === 'expiring' ? 'bg-warning-500' : ''}
                  ${status === 'expired' ? 'bg-danger-500' : ''}
                `} />
                
                {/* Item header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{item.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getLocationEmoji(item.location)} {getLocationName(item.location)}
                      </p>
                    </div>
                  </div>
                  
                  <span className={`
                    px-2 py-1 text-xs font-medium rounded-sharp border
                    ${status === 'fresh' ? 'status-fresh' : ''}
                    ${status === 'expiring' ? 'status-expiring' : ''}
                    ${status === 'expired' ? 'status-expired' : ''}
                  `}>
                    {status}
                  </span>
                </div>

                {/* Item details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Package className="w-4 h-4" />
                    <span>{item.quantity} {item.unit}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {daysLeft >= 0 ? `${daysLeft} days left` : `Expired ${Math.abs(daysLeft)} days ago`}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <DollarSign className="w-4 h-4" />
                    <span>${item.price?.toFixed(2) || 'N/A'}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex-1 btn-secondary text-xs py-2"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </button>
                  
                  <button
                    onClick={() => setModal('editItem', item)}
                    className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-sharp transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="p-2 text-danger-600 dark:text-danger-400 hover:bg-danger-100 dark:hover:bg-danger-900/30 rounded-sharp transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          } else {
            // List view
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className="card p-4 flex items-center space-x-4"
              >
                {/* Status indicator */}
                <div className={`
                  w-1 h-16 rounded-sharp
                  ${status === 'fresh' ? 'bg-success-500' : ''}
                  ${status === 'expiring' ? 'bg-warning-500' : ''}
                  ${status === 'expired' ? 'bg-danger-500' : ''}
                `} />
                
                {/* Item info */}
                <div className="text-2xl">{item.emoji}</div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {item.name}
                    </h3>
                    <span className={`
                      px-2 py-1 text-xs font-medium rounded-sharp border
                      ${status === 'fresh' ? 'status-fresh' : ''}
                      ${status === 'expiring' ? 'status-expiring' : ''}
                      ${status === 'expired' ? 'status-expired' : ''}
                    `}>
                      {status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{getLocationName(item.location)}</span>
                    </span>
                    
                    <span className="flex items-center space-x-1">
                      <Package className="w-4 h-4" />
                      <span>{item.quantity} {item.unit}</span>
                    </span>
                    
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {daysLeft >= 0 ? `${daysLeft} days left` : `Expired ${Math.abs(daysLeft)} days ago`}
                      </span>
                    </span>
                    
                    <span className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>${item.price?.toFixed(2) || 'N/A'}</span>
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="btn-secondary text-sm py-2 px-3"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  
                  <button
                    onClick={() => setModal('editItem', item)}
                    className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-sharp transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="p-2 text-danger-600 dark:text-danger-400 hover:bg-danger-100 dark:hover:bg-danger-900/30 rounded-sharp transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          }
        })}
      </motion.div>
    </div>
  );
}

export default Inventory;