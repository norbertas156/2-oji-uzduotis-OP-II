import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Trash2, Download, Upload, RefreshCw, Bell, Shield, Database } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Settings() {
  const { theme, toggleTheme, resetData, items, locations, shoppingList } = useApp();

  const exportData = () => {
    const data = {
      items,
      locations,
      shoppingList,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smart-fridge-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (window.confirm('This will replace all current data. Are you sure?')) {
          // Here you would dispatch the import action
          console.log('Importing data:', data);
          alert('Data import functionality would be implemented here');
        }
      } catch (error) {
        alert('Invalid backup file');
      }
    };
    reader.readAsText(file);
  };

  const settingSections = [
    {
      title: 'Appearance',
      icon: theme === 'light' ? Sun : Moon,
      items: [
        {
          name: 'Theme',
          description: 'Switch between light and dark mode',
          action: (
            <button
              onClick={toggleTheme}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${theme === 'dark' ? 'bg-primary-600' : 'bg-gray-200'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          )
        }
      ]
    },
    {
      title: 'Data Management',
      icon: Database,
      items: [
        {
          name: 'Export Data',
          description: 'Download a backup of all your data',
          action: (
            <button onClick={exportData} className="btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          )
        },
        {
          name: 'Import Data',
          description: 'Restore data from a backup file',
          action: (
            <label className="btn-secondary cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
          )
        },
        {
          name: 'Reset All Data',
          description: 'Delete all items, locations, and settings',
          action: (
            <button
              onClick={() => {
                if (window.confirm('This will delete ALL your data. This cannot be undone!')) {
                  if (window.confirm('Are you absolutely sure? This action is permanent!')) {
                    resetData();
                  }
                }
              }}
              className="btn-danger"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Reset
            </button>
          )
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          name: 'Expiration Alerts',
          description: 'Get notified when items are about to expire',
          action: (
            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
            </div>
          )
        },
        {
          name: 'Shopping Reminders',
          description: 'Remind me to check my shopping list',
          action: (
            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
            </div>
          )
        }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        {
          name: 'Data Storage',
          description: 'All data is stored locally on your device',
          action: (
            <span className="text-sm text-success-600 dark:text-success-400 font-medium">
              ✓ Local Only
            </span>
          )
        },
        {
          name: 'Clear Cache',
          description: 'Remove temporary files and cached data',
          action: (
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="btn-secondary"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear
            </button>
          )
        }
      ]
    }
  ];

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
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {settingSections.map((section, sectionIndex) => {
          const IconComponent = section.icon;
          return (
            <motion.div
              key={section.title}
              variants={itemVariants}
              className="card p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-sharp-lg">
                  <IconComponent className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-sharp-lg"
                  >
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="ml-4">
                      {item.action}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* App Info */}
        <motion.div
          variants={itemVariants}
          className="card p-6 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            SmartFridge Ultimate
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Version 1.0.0 • Built with React & Tailwind CSS
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <span>{items.length} Total Items</span>
            <span>{locations.length} Locations</span>
            <span>{shoppingList.length} Shopping Items</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Settings;