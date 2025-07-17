import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { addDays, isAfter, isBefore, differenceInDays } from 'date-fns'

const FridgeContext = createContext()

// Initial state with sample data
const initialState = {
  items: [
    {
      id: '1',
      name: 'Milk',
      category: 'Dairy',
      quantity: 1,
      unit: 'liter',
      location: 'fridge',
      purchaseDate: new Date('2024-01-15'),
      expirationDate: new Date('2024-01-25'),
      image: '🥛'
    },
    {
      id: '2',
      name: 'Eggs',
      category: 'Dairy',
      quantity: 12,
      unit: 'pieces',
      location: 'fridge',
      purchaseDate: new Date('2024-01-10'),
      expirationDate: new Date('2024-02-05'),
      image: '🥚'
    },
    {
      id: '3',
      name: 'Bananas',
      category: 'Fruits',
      quantity: 6,
      unit: 'pieces',
      location: 'counter',
      purchaseDate: new Date('2024-01-18'),
      expirationDate: new Date('2024-01-22'),
      image: '🍌'
    },
    {
      id: '4',
      name: 'Bread',
      category: 'Bakery',
      quantity: 1,
      unit: 'loaf',
      location: 'pantry',
      purchaseDate: new Date('2024-01-17'),
      expirationDate: new Date('2024-01-24'),
      image: '🍞'
    },
    {
      id: '5',
      name: 'Chicken Breast',
      category: 'Meat',
      quantity: 500,
      unit: 'grams',
      location: 'freezer',
      purchaseDate: new Date('2024-01-16'),
      expirationDate: new Date('2024-02-16'),
      image: '🍗'
    }
  ],
  storageLocations: [
    { id: 'fridge', name: 'Refrigerator', icon: '❄️', temperature: '4°C' },
    { id: 'freezer', name: 'Freezer', icon: '🧊', temperature: '-18°C' },
    { id: 'pantry', name: 'Pantry', icon: '🏠', temperature: 'Room temp' },
    { id: 'counter', name: 'Counter', icon: '🍽️', temperature: 'Room temp' }
  ],
  recipes: [
    {
      id: '1',
      name: 'Scrambled Eggs',
      image: '🍳',
      difficulty: 'Easy',
      time: '10 min',
      servings: 2,
      ingredients: [
        { name: 'Eggs', amount: 3, unit: 'pieces' },
        { name: 'Milk', amount: 50, unit: 'ml' },
        { name: 'Butter', amount: 10, unit: 'grams' }
      ],
      instructions: [
        'Crack eggs into a bowl',
        'Add milk and whisk together',
        'Heat butter in a pan',
        'Pour in egg mixture and scramble gently',
        'Season with salt and pepper'
      ],
      availableIngredients: 2,
      totalIngredients: 3,
      missingIngredients: ['Butter']
    },
    {
      id: '2',
      name: 'Banana Smoothie',
      image: '🥤',
      difficulty: 'Easy',
      time: '5 min',
      servings: 1,
      ingredients: [
        { name: 'Bananas', amount: 2, unit: 'pieces' },
        { name: 'Milk', amount: 200, unit: 'ml' },
        { name: 'Honey', amount: 1, unit: 'tbsp' }
      ],
      instructions: [
        'Peel and slice bananas',
        'Add all ingredients to blender',
        'Blend until smooth',
        'Serve immediately'
      ],
      availableIngredients: 2,
      totalIngredients: 3,
      missingIngredients: ['Honey']
    }
  ]
}

// Action types
const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  ADD_LOCATION: 'ADD_LOCATION',
  UPDATE_LOCATION: 'UPDATE_LOCATION',
  DELETE_LOCATION: 'DELETE_LOCATION',
  LOAD_DATA: 'LOAD_DATA',
  SAVE_DATA: 'SAVE_DATA'
}

// Reducer function
function fridgeReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, { ...action.payload, id: Date.now().toString() }]
      }
    
    case ACTIONS.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        )
      }
    
    case ACTIONS.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    
    case ACTIONS.ADD_LOCATION:
      return {
        ...state,
        storageLocations: [...state.storageLocations, { ...action.payload, id: Date.now().toString() }]
      }
    
    case ACTIONS.UPDATE_LOCATION:
      return {
        ...state,
        storageLocations: state.storageLocations.map(location =>
          location.id === action.payload.id ? { ...location, ...action.payload } : location
        )
      }
    
    case ACTIONS.DELETE_LOCATION:
      return {
        ...state,
        storageLocations: state.storageLocations.filter(location => location.id !== action.payload)
      }
    
    case ACTIONS.LOAD_DATA:
      return action.payload || state
    
    default:
      return state
  }
}

// Helper functions
export const getExpirationStatus = (expirationDate) => {
  const today = new Date()
  const daysUntilExpiration = differenceInDays(new Date(expirationDate), today)
  
  if (daysUntilExpiration < 0) {
    return { status: 'expired', days: Math.abs(daysUntilExpiration), color: 'danger' }
  } else if (daysUntilExpiration <= 3) {
    return { status: 'expiring-soon', days: daysUntilExpiration, color: 'warning' }
  } else if (daysUntilExpiration <= 7) {
    return { status: 'expiring-this-week', days: daysUntilExpiration, color: 'warning' }
  } else {
    return { status: 'fresh', days: daysUntilExpiration, color: 'success' }
  }
}

export const FridgeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fridgeReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('fridgeData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // Convert date strings back to Date objects
        parsedData.items = parsedData.items.map(item => ({
          ...item,
          purchaseDate: new Date(item.purchaseDate),
          expirationDate: new Date(item.expirationDate)
        }))
        dispatch({ type: ACTIONS.LOAD_DATA, payload: parsedData })
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('fridgeData', JSON.stringify(state))
  }, [state])

  // Actions
  const addItem = (item) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: item })
  }

  const updateItem = (item) => {
    dispatch({ type: ACTIONS.UPDATE_ITEM, payload: item })
  }

  const deleteItem = (id) => {
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: id })
  }

  const addLocation = (location) => {
    dispatch({ type: ACTIONS.ADD_LOCATION, payload: location })
  }

  const updateLocation = (location) => {
    dispatch({ type: ACTIONS.UPDATE_LOCATION, payload: location })
  }

  const deleteLocation = (id) => {
    dispatch({ type: ACTIONS.DELETE_LOCATION, payload: id })
  }

  // Computed values
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
          item.name.toLowerCase() === ingredient.name.toLowerCase() &&
          item.quantity >= ingredient.amount
        )
      )
      
      const missingIngredients = recipe.ingredients.filter(ingredient =>
        !state.items.some(item => 
          item.name.toLowerCase() === ingredient.name.toLowerCase() &&
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

  const value = {
    ...state,
    addItem,
    updateItem,
    deleteItem,
    addLocation,
    updateLocation,
    deleteLocation,
    getItemsByLocation,
    getExpiringItems,
    getExpiredItems,
    getItemsByCategory,
    getRecipeRecommendations,
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