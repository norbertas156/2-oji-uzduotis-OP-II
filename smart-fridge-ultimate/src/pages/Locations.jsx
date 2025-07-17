import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Package, Plus, Edit, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Locations() {
  const { locations, items, setModal, deleteLocation } = useApp();

  const getLocationItems = (locationId) => {
    return items.filter(item => item.location === locationId);
  };

  const getCapacityUsed = (locationId) => {
    const locationItems = getLocationItems(locationId);
    return locationItems.length;
  };

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
    <div className="p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {locations.map((location) => {
          const itemCount = getLocationItems(location.id).length;
          const capacityUsed = (itemCount / location.capacity) * 100;

          return (
            <motion.div
              key={location.id}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="card-hover p-6 relative overflow-hidden"
            >
              {/* Capacity indicator */}
              <div 
                className="absolute top-0 left-0 h-1 bg-primary-500 transition-all duration-300"
                style={{ width: `${Math.min(capacityUsed, 100)}%` }}
              />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{location.emoji}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {location.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {location.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Thermometer className="w-4 h-4" />
                  <span>{location.temperature}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Package className="w-4 h-4" />
                  <span>{itemCount} / {location.capacity} items</span>
                </div>

                {/* Capacity bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      capacityUsed > 90 ? 'bg-danger-500' :
                      capacityUsed > 70 ? 'bg-warning-500' : 'bg-success-500'
                    }`}
                    style={{ width: `${Math.min(capacityUsed, 100)}%` }}
                  />
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {capacityUsed.toFixed(1)}% capacity used
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setModal('editLocation', location)}
                  className="flex-1 btn-secondary text-sm py-2"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </button>
                
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${location.name}? Items will need to be reassigned.`)) {
                      deleteLocation(location.id);
                    }
                  }}
                  className="p-2 text-danger-600 dark:text-danger-400 hover:bg-danger-100 dark:hover:bg-danger-900/30 rounded-sharp transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}

        {/* Add location card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setModal('addLocation')}
          className="card p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 cursor-pointer transition-colors group"
        >
          <div className="text-center">
            <Plus className="w-12 h-12 text-gray-400 group-hover:text-primary-500 mx-auto mb-3 transition-colors" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Add Location
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create a new storage location
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Locations;