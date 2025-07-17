import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ChefHat, CheckCircle, X, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Recipes() {
  const { compatibleRecipes, setSelectedRecipe } = useApp();

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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {compatibleRecipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.02 }}
            className="card-hover p-6 relative overflow-hidden"
          >
            {/* Compatibility indicator */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary-500 to-transparent opacity-20" />
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{recipe.emoji}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{recipe.difficulty}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {recipe.compatibility}%
                </div>
                <div className="text-xs text-gray-500">match</div>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{recipe.description}</p>

            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.cookTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>

            {/* Ingredients preview */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Ingredients</h4>
              <div className="space-y-1">
                {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    {ingredient.available ? (
                      <CheckCircle className="w-3 h-3 text-success-500" />
                    ) : (
                      <X className="w-3 h-3 text-danger-500" />
                    )}
                    <span className={ingredient.available ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}>
                      {ingredient.name}
                    </span>
                  </div>
                ))}
                {recipe.ingredients.length > 3 && (
                  <p className="text-xs text-gray-500">+{recipe.ingredients.length - 3} more ingredients</p>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedRecipe(recipe)}
              className="w-full btn-primary"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Recipe
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Recipes;