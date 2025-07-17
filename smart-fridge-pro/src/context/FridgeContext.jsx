import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { addDays, isAfter, isBefore, differenceInDays, format, startOfWeek, endOfWeek } from 'date-fns'
import toast from 'react-hot-toast'

const FridgeContext = createContext()

// Enhanced initial state with professional sample data
const initialState = {
  items: [
    {
      id: '1',
      name: 'Organic Whole Milk',
      category: 'Dairy & Eggs',
      quantity: 1000,
      unit: 'ml',
      location: 'refrigerator',
      purchaseDate: new Date('2024-01-15'),
      expirationDate: new Date('2024-01-25'),
      supplier: 'Organic Valley',
      batchNumber: 'OV-2024-001',
      costPerUnit: 4.99,
      nutritionalInfo: { calories: 150, protein: 8, fat: 8, carbs: 12 },
      image: '🥛',
      status: 'active'
    },
    {
      id: '2',
      name: 'Free-Range Eggs',
      category: 'Dairy & Eggs',
      quantity: 12,
      unit: 'pieces',
      location: 'refrigerator',
      purchaseDate: new Date('2024-01-10'),
      expirationDate: new Date('2024-02-05'),
      supplier: 'Happy Hen Farm',
      batchNumber: 'HHF-2024-002',
      costPerUnit: 6.99,
      nutritionalInfo: { calories: 70, protein: 6, fat: 5, carbs: 1 },
      image: '🥚',
      status: 'active'
    },
    {
      id: '3',
      name: 'Premium Bananas',
      category: 'Fresh Produce',
      quantity: 6,
      unit: 'pieces',
      location: 'counter',
      purchaseDate: new Date('2024-01-18'),
      expirationDate: new Date('2024-01-22'),
      supplier: 'Tropical Farms',
      batchNumber: 'TF-2024-003',
      costPerUnit: 2.99,
      nutritionalInfo: { calories: 105, protein: 1, fat: 0, carbs: 27 },
      image: '🍌',
      status: 'active'
    },
    {
      id: '4',
      name: 'Artisan Sourdough Bread',
      category: 'Bakery',
      quantity: 1,
      unit: 'loaf',
      location: 'pantry',
      purchaseDate: new Date('2024-01-17'),
      expirationDate: new Date('2024-01-24'),
      supplier: 'Local Bakery Co',
      batchNumber: 'LBC-2024-004',
      costPerUnit: 5.99,
      nutritionalInfo: { calories: 80, protein: 3, fat: 1, carbs: 15 },
      image: '🍞',
      status: 'active'
    },
    {
      id: '5',
      name: 'Organic Chicken Breast',
      category: 'Meat & Seafood',
      quantity: 500,
      unit: 'grams',
      location: 'freezer',
      purchaseDate: new Date('2024-01-16'),
      expirationDate: new Date('2024-02-16'),
      supplier: 'Farm Fresh Poultry',
      batchNumber: 'FFP-2024-005',
      costPerUnit: 12.99,
      nutritionalInfo: { calories: 165, protein: 31, fat: 3.6, carbs: 0 },
      image: '🍗',
      status: 'active'
    }
  ],
  storageLocations: [
    { 
      id: 'refrigerator', 
      name: 'Main Refrigerator', 
      icon: '❄️', 
      temperature: '4°C',
      capacity: 500,
      type: 'refrigerated',
      zone: 'kitchen'
    },
    { 
      id: 'freezer', 
      name: 'Chest Freezer', 
      icon: '🧊', 
      temperature: '-18°C',
      capacity: 300,
      type: 'frozen',
      zone: 'kitchen'
    },
    { 
      id: 'pantry', 
      name: 'Dry Storage Pantry', 
      icon: '🏠', 
      temperature: '20°C',
      capacity: 1000,
      type: 'ambient',
      zone: 'pantry'
    },
    { 
      id: 'counter', 
      name: 'Kitchen Counter', 
      icon: '🍽️', 
      temperature: '22°C',
      capacity: 50,
      type: 'ambient',
      zone: 'kitchen'
    }
  ],
  recipes: [
    {
      id: '1',
      name: 'Professional Scrambled Eggs',
      image: '🍳',
      difficulty: 'Easy',
      time: '8 min',
      servings: 2,
      chef: 'Gordon Ramsay',
      cuisine: 'French',
      ingredients: [
        { name: 'Free-Range Eggs', amount: 3, unit: 'pieces' },
        { name: 'Organic Whole Milk', amount: 50, unit: 'ml' },
        { name: 'Butter', amount: 20, unit: 'grams' },
        { name: 'Salt', amount: 1, unit: 'pinch' },
        { name: 'Black Pepper', amount: 1, unit: 'pinch' }
      ],
      instructions: [
        'Crack eggs into a cold pan with butter',
        'Place on medium heat and start stirring continuously',
        'Add a splash of milk and continue stirring',
        'Remove from heat while still slightly runny',
        'Season with salt and pepper, serve immediately'
      ],
      nutritionalInfo: { calories: 320, protein: 24, fat: 24, carbs: 4 },
      prepTime: 3,
      cookTime: 5,
      tags: ['breakfast', 'protein', 'quick'],
      rating: 4.8
    },
    {
      id: '2',
      name: 'Gourmet Banana Smoothie',
      image: '🥤',
      difficulty: 'Easy',
      time: '5 min',
      servings: 1,
      chef: 'Nutrition Expert',
      cuisine: 'International',
      ingredients: [
        { name: 'Premium Bananas', amount: 2, unit: 'pieces' },
        { name: 'Organic Whole Milk', amount: 200, unit: 'ml' },
        { name: 'Honey', amount: 1, unit: 'tbsp' },
        { name: 'Vanilla Extract', amount: 0.5, unit: 'tsp' }
      ],
      instructions: [
        'Peel and slice bananas into chunks',
        'Add all ingredients to high-speed blender',
        'Blend on high for 60 seconds until smooth',
        'Taste and adjust sweetness if needed',
        'Serve immediately in chilled glass'
      ],
      nutritionalInfo: { calories: 285, protein: 12, fat: 8, carbs: 48 },
      prepTime: 5,
      cookTime: 0,
      tags: ['smoothie', 'healthy', 'breakfast'],
      rating: 4.6
    }
  ],
  settings: {
    notifications: {
      expiring: true,
      expired: true,
      lowStock: true,
      daysBefore: 3
    },
    units: 'metric',
    currency: 'USD',
    theme: 'light'
  },
  analytics: {
    totalValue: 0,
    wasteReduction: 15.2,
    avgItemLifespan: 12,
    mostUsedCategories: []
  }
}

// Action types
const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  ADD_LOCATION: 'ADD_LOCATION',
  UPDATE_LOCATION: 'UPDATE_LOCATION',
  DELETE_LOCATION: 'DELETE_LOCATION',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  LOAD_DATA: 'LOAD_DATA',
  CALCULATE_ANALYTICS: 'CALCULATE_ANALYTICS'
}

// Enhanced reducer function
function fridgeReducer(state, action) {
  let newState
  
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      newState = {
        ...state,
        items: [...state.items, { 
          ...action.payload, 
          id: Date.now().toString(),
          status: 'active',
          addedDate: new Date()
        }]
      }
      break
    
    case ACTIONS.UPDATE_ITEM:
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        )
      }
      break
    
    case ACTIONS.DELETE_ITEM:
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
      break
    
    case ACTIONS.ADD_LOCATION:
      newState = {
        ...state,
        storageLocations: [...state.storageLocations, { 
          ...action.payload, 
          id: Date.now().toString() 
        }]
      }
      break
    
    case ACTIONS.UPDATE_LOCATION:
      newState = {
        ...state,
        storageLocations: state.storageLocations.map(location =>
          location.id === action.payload.id ? { ...location, ...action.payload } : location
        )
      }
      break
    
    case ACTIONS.DELETE_LOCATION:
      newState = {
        ...state,
        storageLocations: state.storageLocations.filter(location => location.id !== action.payload)
      }
      break
    
    case ACTIONS.UPDATE_SETTINGS:
      newState = {
        ...state,
        settings: { ...state.settings, ...action.payload }
      }
      break
    
    case ACTIONS.LOAD_DATA:
      return action.payload || state
    
    case ACTIONS.CALCULATE_ANALYTICS:
      const analytics = calculateAnalytics(state.items)
      newState = {
        ...state,
        analytics
      }
      break
    
    default:
      return state
  }
  
  // Auto-calculate analytics when state changes
  if (newState && action.type !== ACTIONS.CALCULATE_ANALYTICS) {
    newState.analytics = calculateAnalytics(newState.items)
  }
  
  return newState || state
}

// Enhanced helper functions
export const getExpirationStatus = (expirationDate) => {
  const today = new Date()
  const daysUntilExpiration = differenceInDays(new Date(expirationDate), today)
  
  if (daysUntilExpiration < 0) {
    return { 
      status: 'expired', 
      days: Math.abs(daysUntilExpiration), 
      color: 'danger',
      priority: 'high',
      action: 'Remove immediately'
    }
  } else if (daysUntilExpiration <= 1) {
    return { 
      status: 'expires-today', 
      days: daysUntilExpiration, 
      color: 'danger',
      priority: 'high',
      action: 'Use today'
    }
  } else if (daysUntilExpiration <= 3) {
    return { 
      status: 'expiring-soon', 
      days: daysUntilExpiration, 
      color: 'warning',
      priority: 'medium',
      action: 'Use within 3 days'
    }
  } else if (daysUntilExpiration <= 7) {
    return { 
      status: 'expiring-this-week', 
      days: daysUntilExpiration, 
      color: 'warning',
      priority: 'low',
      action: 'Plan to use this week'
    }
  } else {
    return { 
      status: 'fresh', 
      days: daysUntilExpiration, 
      color: 'success',
      priority: 'none',
      action: 'Good condition'
    }
  }
}

const calculateAnalytics = (items) => {
  const totalValue = items.reduce((sum, item) => sum + (item.costPerUnit || 0), 0)
  const expiredItems = items.filter(item => 
    isBefore(new Date(item.expirationDate), new Date())
  )
  const expiredValue = expiredItems.reduce((sum, item) => sum + (item.costPerUnit || 0), 0)
  const wasteReduction = totalValue > 0 ? ((totalValue - expiredValue) / totalValue) * 100 : 0
  
  const categories = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})
  
  const mostUsedCategories = Object.entries(categories)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([category, count]) => ({ category, count }))
  
  const avgItemLifespan = items.length > 0 
    ? items.reduce((sum, item) => {
        const lifespan = differenceInDays(new Date(item.expirationDate), new Date(item.purchaseDate))
        return sum + lifespan
      }, 0) / items.length
    : 0

  return {
    totalValue: Math.round(totalValue * 100) / 100,
    wasteReduction: Math.round(wasteReduction * 100) / 100,
    avgItemLifespan: Math.round(avgItemLifespan),
    mostUsedCategories,
    expiredValue: Math.round(expiredValue * 100) / 100,
    totalItems: items.length,
    expiredItems: expiredItems.length
  }
}

export const FridgeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fridgeReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('fridgeProData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // Convert date strings back to Date objects
        parsedData.items = parsedData.items.map(item => ({
          ...item,
          purchaseDate: new Date(item.purchaseDate),
          expirationDate: new Date(item.expirationDate),
          addedDate: item.addedDate ? new Date(item.addedDate) : new Date()
        }))
        dispatch({ type: ACTIONS.LOAD_DATA, payload: parsedData })
      } catch (error) {
        console.error('Error loading saved data:', error)
        toast.error('Failed to load saved data')
      }
    }
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('fridgeProData', JSON.stringify(state))
  }, [state])

  // Actions with toast notifications
  const addItem = (item) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: item })
    toast.success(`Added ${item.name} to inventory`)
  }

  const updateItem = (item) => {
    dispatch({ type: ACTIONS.UPDATE_ITEM, payload: item })
    toast.success(`Updated ${item.name}`)
  }

  const deleteItem = (id) => {
    const item = state.items.find(i => i.id === id)
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: id })
    toast.success(`Removed ${item?.name || 'item'} from inventory`)
  }

  const addLocation = (location) => {
    dispatch({ type: ACTIONS.ADD_LOCATION, payload: location })
    toast.success(`Added storage location: ${location.name}`)
  }

  const updateLocation = (location) => {
    dispatch({ type: ACTIONS.UPDATE_LOCATION, payload: location })
    toast.success(`Updated location: ${location.name}`)
  }

  const deleteLocation = (id) => {
    const location = state.storageLocations.find(l => l.id === id)
    dispatch({ type: ACTIONS.DELETE_LOCATION, payload: id })
    toast.success(`Removed location: ${location?.name || 'location'}`)
  }

  const updateSettings = (settings) => {
    dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: settings })
    toast.success('Settings updated successfully')
  }

  // Enhanced computed values
  const getItemsByLocation = (locationId) => {
    return state.items.filter(item => item.location === locationId)
  }

  const getExpiringItems = (days = 7) => {
    const cutoffDate = addDays(new Date(), days)
    return state.items.filter(item => 
      isBefore(new Date(item.expirationDate), cutoffDate) && 
      isAfter(new Date(item.expirationDate), new Date())
    )
  }

  const getExpiredItems = () => {
    return state.items.filter(item => 
      isBefore(new Date(item.expirationDate), new Date())
    )
  }

  const getItemsByCategory = () => {
    return state.items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    }, {})
  }

  const getRecipeRecommendations = () => {
    return state.recipes.map(recipe => {
      const availableIngredients = recipe.ingredients.filter(ingredient =>
        state.items.some(item => 
          item.name.toLowerCase().includes(ingredient.name.toLowerCase()) &&
          item.quantity >= ingredient.amount
        )
      )
      
      const missingIngredients = recipe.ingredients.filter(ingredient =>
        !state.items.some(item => 
          item.name.toLowerCase().includes(ingredient.name.toLowerCase()) &&
          item.quantity >= ingredient.amount
        )
      )

      return {
        ...recipe,
        availableIngredients: availableIngredients.length,
        totalIngredients: recipe.ingredients.length,
        missingIngredients: missingIngredients.map(ing => ing.name),
        canMake: missingIngredients.length === 0,
        compatibility: (availableIngredients.length / recipe.ingredients.length) * 100
      }
    }).sort((a, b) => b.compatibility - a.compatibility)
  }

  const getWeeklyData = () => {
    const weekStart = startOfWeek(new Date())
    const weekEnd = endOfWeek(new Date())
    
    const weeklyItems = state.items.filter(item => {
      const addedDate = new Date(item.addedDate || item.purchaseDate)
      return addedDate >= weekStart && addedDate <= weekEnd
    })
    
    return {
      itemsAdded: weeklyItems.length,
      totalValue: weeklyItems.reduce((sum, item) => sum + (item.costPerUnit || 0), 0),
      categories: [...new Set(weeklyItems.map(item => item.category))].length
    }
  }

  const value = {
    ...state,
    addItem,
    updateItem,
    deleteItem,
    addLocation,
    updateLocation,
    deleteLocation,
    updateSettings,
    getItemsByLocation,
    getExpiringItems,
    getExpiredItems,
    getItemsByCategory,
    getRecipeRecommendations,
    getWeeklyData,
    getExpirationStatus
  }

  return (
    <FridgeContext.Provider value={value}>
      {children}
    </FridgeContext.Provider>
  )
}

export const useFridge = () => {
  const context = useContext(FridgeContext)
  if (!context) {
    throw new Error('useFridge must be used within a FridgeProvider')
  }
  return context
}