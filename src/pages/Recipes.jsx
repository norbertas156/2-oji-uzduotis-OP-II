import React, { useState } from 'react'
import { 
  ChefHat, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle,
  ShoppingCart,
  Filter,
  Search
} from 'lucide-react'
import { useFridge } from '../context/FridgeContext'

export default function Recipes() {
  const { getRecipeRecommendations } = useFridge()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('all') // all, can-make, need-few
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const allRecipes = getRecipeRecommendations()
  
  const filteredRecipes = allRecipes
    .filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      switch (filterBy) {
        case 'can-make':
          return matchesSearch && recipe.canMake
        case 'need-few':
          return matchesSearch && !recipe.canMake && recipe.missingIngredients.length <= 2
        default:
          return matchesSearch
      }
    })

  const RecipeCard = ({ recipe }) => (
    <div 
      className="card hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => setSelectedRecipe(recipe)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-4xl group-hover:scale-110 transition-transform">
            {recipe.image}
          </span>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
              {recipe.name}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
              <span className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{recipe.time}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Users size={14} />
                <span>{recipe.servings}</span>
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {recipe.difficulty}
              </span>
            </div>
          </div>
        </div>
        
        {recipe.canMake && (
          <div className="flex items-center space-x-1 text-green-600">
            <CheckCircle size={20} />
            <span className="text-sm font-medium">Ready!</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {/* Compatibility Bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Available ingredients</span>
            <span className="font-medium">
              {recipe.availableIngredients}/{recipe.totalIngredients}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                recipe.compatibility === 100 ? 'bg-green-500' :
                recipe.compatibility >= 70 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${recipe.compatibility}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {Math.round(recipe.compatibility)}% compatibility
          </p>
        </div>

        {/* Missing Ingredients */}
        {recipe.missingIngredients.length > 0 && (
          <div>
            <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
              <ShoppingCart size={14} />
              <span>Need to buy:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {recipe.missingIngredients.map((ingredient, index) => (
                <span 
                  key={index}
                  className="inline-block px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const RecipeModal = ({ recipe, onClose }) => {
    if (!recipe) return null

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div 
            className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
            onClick={onClose}
          />

          <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
              >
                ✕
              </button>
              
              <div className="p-8">
                <div className="flex items-start space-x-6 mb-8">
                  <span className="text-6xl">{recipe.image}</span>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{recipe.name}</h2>
                    <div className="flex items-center space-x-6 text-gray-600 mb-4">
                      <span className="flex items-center space-x-2">
                        <Clock size={18} />
                        <span>{recipe.time}</span>
                      </span>
                      <span className="flex items-center space-x-2">
                        <Users size={18} />
                        <span>{recipe.servings} servings</span>
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                    
                    {recipe.canMake ? (
                      <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                        <CheckCircle size={18} className="mr-2" />
                        <span className="font-medium">You can make this recipe!</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">
                        <AlertCircle size={18} className="mr-2" />
                        <span className="font-medium">
                          Need {recipe.missingIngredients.length} more ingredient(s)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Ingredients */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h3>
                    <div className="space-y-2">
                      {recipe.ingredients.map((ingredient, index) => {
                        const isAvailable = !recipe.missingIngredients.includes(ingredient.name)
                        return (
                          <div 
                            key={index}
                            className={`flex items-center justify-between p-3 rounded-lg ${
                              isAvailable ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                            }`}
                          >
                            <span className={`font-medium ${
                              isAvailable ? 'text-green-900' : 'text-red-900'
                            }`}>
                              {ingredient.name}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className={`text-sm ${
                                isAvailable ? 'text-green-700' : 'text-red-700'
                              }`}>
                                {ingredient.amount} {ingredient.unit}
                              </span>
                              {isAvailable ? (
                                <CheckCircle size={16} className="text-green-600" />
                              ) : (
                                <ShoppingCart size={16} className="text-red-600" />
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h3>
                    <div className="space-y-3">
                      {recipe.instructions.map((instruction, index) => (
                        <div key={index} className="flex space-x-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <p className="text-gray-700 leading-relaxed">{instruction}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recipe Recommendations</h1>
          <p className="text-gray-600 mt-1">
            Discover what you can cook with your available ingredients
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="select-field"
          >
            <option value="all">All Recipes</option>
            <option value="can-make">Can Make Now</option>
            <option value="need-few">Need Few Items</option>
          </select>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Total: {filteredRecipes.length}</span>
            <span>Can make: {filteredRecipes.filter(r => r.canMake).length}</span>
          </div>
        </div>
      </div>

      {/* Recipe Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {allRecipes.filter(r => r.canMake).length}
          </div>
          <div className="text-sm text-gray-600">Ready to Cook</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {allRecipes.filter(r => !r.canMake && r.missingIngredients.length <= 2).length}
          </div>
          <div className="text-sm text-gray-600">Need 1-2 Items</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-600 mb-1">
            {Math.round(allRecipes.reduce((acc, r) => acc + r.compatibility, 0) / allRecipes.length)}%
          </div>
          <div className="text-sm text-gray-600">Avg. Compatibility</div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <ChefHat className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No recipes found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search criteria or add more ingredients to your inventory.
          </p>
        </div>
      )}

      {/* Recipe Modal */}
      <RecipeModal 
        recipe={selectedRecipe} 
        onClose={() => setSelectedRecipe(null)} 
      />
    </div>
  )
}