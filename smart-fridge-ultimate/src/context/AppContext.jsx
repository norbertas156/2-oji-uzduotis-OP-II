import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { format, addDays, isAfter, isBefore, differenceInDays } from 'date-fns';

const AppContext = createContext();

// Initial state
const initialState = {
  // Theme
  theme: 'light',
  
  // Items in storage
  items: [
    {
      id: '1',
      name: 'Organic Milk',
      emoji: '🥛',
      category: 'Dairy',
      location: 'fridge',
      quantity: 1,
      unit: 'L',
      purchaseDate: new Date().toISOString(),
      expirationDate: addDays(new Date(), 5).toISOString(),
      price: 4.99,
      supplier: 'Fresh Farms Co.',
      batchNumber: 'MK-2024-001',
      barcode: '1234567890123',
      nutrition: {
        calories: 150,
        protein: 8,
        carbs: 12,
        fat: 8,
        fiber: 0
      },
      notes: 'Premium organic whole milk'
    },
    {
      id: '2',
      name: 'Free Range Eggs',
      emoji: '🥚',
      category: 'Dairy',
      location: 'fridge',
      quantity: 12,
      unit: 'pieces',
      purchaseDate: new Date().toISOString(),
      expirationDate: addDays(new Date(), 14).toISOString(),
      price: 6.99,
      supplier: 'Happy Hens Farm',
      batchNumber: 'EG-2024-042',
      barcode: '2345678901234',
      nutrition: {
        calories: 70,
        protein: 6,
        carbs: 1,
        fat: 5,
        fiber: 0
      },
      notes: 'Grade A large eggs'
    },
    {
      id: '3',
      name: 'Organic Bananas',
      emoji: '🍌',
      category: 'Fruits',
      location: 'counter',
      quantity: 6,
      unit: 'pieces',
      purchaseDate: new Date().toISOString(),
      expirationDate: addDays(new Date(), 7).toISOString(),
      price: 3.49,
      supplier: 'Tropical Fruits Inc.',
      batchNumber: 'BN-2024-156',
      barcode: '3456789012345',
      nutrition: {
        calories: 105,
        protein: 1,
        carbs: 27,
        fat: 0,
        fiber: 3
      },
      notes: 'Perfectly ripe organic bananas'
    },
    {
      id: '4',
      name: 'Sourdough Bread',
      emoji: '🍞',
      category: 'Bakery',
      location: 'pantry',
      quantity: 1,
      unit: 'loaf',
      purchaseDate: new Date().toISOString(),
      expirationDate: addDays(new Date(), 3).toISOString(),
      price: 4.50,
      supplier: 'Artisan Bakery',
      batchNumber: 'BR-2024-089',
      barcode: '4567890123456',
      nutrition: {
        calories: 120,
        protein: 4,
        carbs: 22,
        fat: 2,
        fiber: 2
      },
      notes: 'Fresh baked sourdough'
    },
    {
      id: '5',
      name: 'Chicken Breast',
      emoji: '🍗',
      category: 'Meat',
      location: 'freezer',
      quantity: 2,
      unit: 'lbs',
      purchaseDate: new Date().toISOString(),
      expirationDate: addDays(new Date(), 30).toISOString(),
      price: 12.99,
      supplier: 'Prime Meats Ltd.',
      batchNumber: 'CB-2024-203',
      barcode: '5678901234567',
      nutrition: {
        calories: 231,
        protein: 43,
        carbs: 0,
        fat: 5,
        fiber: 0
      },
      notes: 'Boneless, skinless chicken breast'
    },
    {
      id: '6',
      name: 'Fresh Spinach',
      emoji: '🥬',
      category: 'Vegetables',
      location: 'fridge',
      quantity: 1,
      unit: 'bunch',
      purchaseDate: new Date().toISOString(),
      expirationDate: addDays(new Date(), 5).toISOString(),
      price: 2.99,
      supplier: 'Green Leaf Farms',
      batchNumber: 'SP-2024-078',
      barcode: '6789012345678',
      nutrition: {
        calories: 23,
        protein: 3,
        carbs: 4,
        fat: 0,
        fiber: 2
      },
      notes: 'Fresh baby spinach leaves'
    }
  ],
  
  // Storage locations
  locations: [
    {
      id: 'fridge',
      name: 'Refrigerator',
      emoji: '🧊',
      temperature: '4°C',
      capacity: 100,
      description: 'Main refrigerator compartment'
    },
    {
      id: 'freezer',
      name: 'Freezer',
      emoji: '❄️',
      temperature: '-18°C',
      capacity: 50,
      description: 'Freezer compartment'
    },
    {
      id: 'pantry',
      name: 'Pantry',
      emoji: '🏠',
      temperature: 'Room temp',
      capacity: 200,
      description: 'Dry goods storage'
    },
    {
      id: 'counter',
      name: 'Counter',
      emoji: '🍎',
      temperature: 'Room temp',
      capacity: 30,
      description: 'Kitchen counter'
    }
  ],
  
  // Recipe recommendations
  recipes: [
    {
      id: '1',
      name: 'Scrambled Eggs with Spinach',
      emoji: '🍳',
      difficulty: 'Easy',
      cookTime: '10 mins',
      servings: 2,
      compatibility: 95,
      description: 'Fluffy scrambled eggs with fresh spinach',
      instructions: [
        'Heat pan over medium heat',
        'Whisk eggs in a bowl',
        'Add spinach to pan and cook until wilted',
        'Add eggs and scramble gently',
        'Season with salt and pepper'
      ],
      ingredients: [
        { name: 'Free Range Eggs', amount: 4, unit: 'pieces', available: true },
        { name: 'Fresh Spinach', amount: 1, unit: 'cup', available: true },
        { name: 'Butter', amount: 1, unit: 'tbsp', available: false },
        { name: 'Salt', amount: 1, unit: 'pinch', available: false }
      ],
      nutrition: {
        calories: 280,
        protein: 18,
        carbs: 4,
        fat: 22,
        fiber: 2
      },
      tags: ['breakfast', 'quick', 'protein']
    },
    {
      id: '2',
      name: 'Chicken Spinach Salad',
      emoji: '🥗',
      difficulty: 'Medium',
      cookTime: '25 mins',
      servings: 3,
      compatibility: 85,
      description: 'Grilled chicken breast over fresh spinach',
      instructions: [
        'Season and grill chicken breast',
        'Let chicken rest and slice',
        'Prepare spinach salad base',
        'Add sliced chicken on top',
        'Drizzle with dressing'
      ],
      ingredients: [
        { name: 'Chicken Breast', amount: 1, unit: 'lb', available: true },
        { name: 'Fresh Spinach', amount: 2, unit: 'cups', available: true },
        { name: 'Olive Oil', amount: 2, unit: 'tbsp', available: false },
        { name: 'Lemon', amount: 1, unit: 'piece', available: false },
        { name: 'Cherry Tomatoes', amount: 1, unit: 'cup', available: false }
      ],
      nutrition: {
        calories: 320,
        protein: 45,
        carbs: 8,
        fat: 12,
        fiber: 3
      },
      tags: ['lunch', 'healthy', 'protein', 'salad']
    },
    {
      id: '3',
      name: 'Banana Smoothie',
      emoji: '🥤',
      difficulty: 'Easy',
      cookTime: '5 mins',
      servings: 1,
      compatibility: 75,
      description: 'Creamy banana smoothie with milk',
      instructions: [
        'Peel and slice bananas',
        'Add to blender with milk',
        'Blend until smooth',
        'Add ice if desired',
        'Serve immediately'
      ],
      ingredients: [
        { name: 'Organic Bananas', amount: 2, unit: 'pieces', available: true },
        { name: 'Organic Milk', amount: 1, unit: 'cup', available: true },
        { name: 'Honey', amount: 1, unit: 'tbsp', available: false },
        { name: 'Vanilla Extract', amount: 1, unit: 'tsp', available: false }
      ],
      nutrition: {
        calories: 250,
        protein: 10,
        carbs: 45,
        fat: 5,
        fiber: 4
      },
      tags: ['breakfast', 'smoothie', 'quick', 'healthy']
    }
  ],
  
  // Categories
  categories: [
    { id: 'fruits', name: 'Fruits', emoji: '🍎', color: 'red' },
    { id: 'vegetables', name: 'Vegetables', emoji: '🥬', color: 'green' },
    { id: 'dairy', name: 'Dairy', emoji: '🥛', color: 'blue' },
    { id: 'meat', name: 'Meat', emoji: '🥩', color: 'red' },
    { id: 'grains', name: 'Grains', emoji: '🌾', color: 'yellow' },
    { id: 'bakery', name: 'Bakery', emoji: '🍞', color: 'orange' },
    { id: 'snacks', name: 'Snacks', emoji: '🍪', color: 'purple' },
    { id: 'beverages', name: 'Beverages', emoji: '🥤', color: 'blue' },
    { id: 'condiments', name: 'Condiments', emoji: '🧂', color: 'gray' },
    { id: 'frozen', name: 'Frozen', emoji: '🧊', color: 'cyan' }
  ],
  
  // Shopping list
  shoppingList: [],
  
  // Filters and search
  filters: {
    location: '',
    category: '',
    status: '',
    search: ''
  },
  
  // UI state
  ui: {
    sidebarOpen: true,
    activeModal: null,
    selectedItem: null,
    selectedRecipe: null,
    viewMode: 'grid'
  }
};

// Action types
const ACTIONS = {
  // Theme
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_THEME: 'SET_THEME',
  
  // Items
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  BULK_DELETE_ITEMS: 'BULK_DELETE_ITEMS',
  
  // Locations
  ADD_LOCATION: 'ADD_LOCATION',
  UPDATE_LOCATION: 'UPDATE_LOCATION',
  DELETE_LOCATION: 'DELETE_LOCATION',
  
  // Shopping list
  ADD_TO_SHOPPING_LIST: 'ADD_TO_SHOPPING_LIST',
  REMOVE_FROM_SHOPPING_LIST: 'REMOVE_FROM_SHOPPING_LIST',
  CLEAR_SHOPPING_LIST: 'CLEAR_SHOPPING_LIST',
  
  // Filters
  SET_FILTER: 'SET_FILTER',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  
  // UI
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_MODAL: 'SET_MODAL',
  SET_SELECTED_ITEM: 'SET_SELECTED_ITEM',
  SET_SELECTED_RECIPE: 'SET_SELECTED_RECIPE',
  SET_VIEW_MODE: 'SET_VIEW_MODE',
  
  // Data
  LOAD_DATA: 'LOAD_DATA',
  RESET_DATA: 'RESET_DATA'
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
      
    case ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
      
    case ACTIONS.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, { ...action.payload, id: Date.now().toString() }]
      };
      
    case ACTIONS.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        )
      };
      
    case ACTIONS.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    case ACTIONS.BULK_DELETE_ITEMS:
      return {
        ...state,
        items: state.items.filter(item => !action.payload.includes(item.id))
      };
      
    case ACTIONS.ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, { ...action.payload, id: Date.now().toString() }]
      };
      
    case ACTIONS.UPDATE_LOCATION:
      return {
        ...state,
        locations: state.locations.map(location =>
          location.id === action.payload.id ? { ...location, ...action.payload } : location
        )
      };
      
    case ACTIONS.DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(location => location.id !== action.payload)
      };
      
    case ACTIONS.ADD_TO_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: [...state.shoppingList, { ...action.payload, id: Date.now().toString() }]
      };
      
    case ACTIONS.REMOVE_FROM_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: state.shoppingList.filter(item => item.id !== action.payload)
      };
      
    case ACTIONS.CLEAR_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: []
      };
      
    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value
        }
      };
      
    case ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          location: '',
          category: '',
          status: '',
          search: ''
        }
      };
      
    case ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...state,
        ui: {
          ...state.ui,
          sidebarOpen: !state.ui.sidebarOpen
        }
      };
      
    case ACTIONS.SET_MODAL:
      return {
        ...state,
        ui: {
          ...state.ui,
          activeModal: action.payload
        }
      };
      
    case ACTIONS.SET_SELECTED_ITEM:
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedItem: action.payload
        }
      };
      
    case ACTIONS.SET_SELECTED_RECIPE:
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedRecipe: action.payload
        }
      };
      
    case ACTIONS.SET_VIEW_MODE:
      return {
        ...state,
        ui: {
          ...state.ui,
          viewMode: action.payload
        }
      };
      
    case ACTIONS.LOAD_DATA:
      return {
        ...state,
        ...action.payload
      };
      
    case ACTIONS.RESET_DATA:
      return initialState;
      
    default:
      return state;
  }
}

// Utility functions
export const getItemStatus = (item) => {
  if (!item || !item.expirationDate) return 'unknown';
  
  const now = new Date();
  const expiration = new Date(item.expirationDate);
  const daysUntilExpiration = differenceInDays(expiration, now);
  
  if (daysUntilExpiration < 0) return 'expired';
  if (daysUntilExpiration <= 2) return 'expiring';
  return 'fresh';
};

export const getItemsByStatus = (items) => {
  if (!items || !Array.isArray(items)) {
    return { fresh: 0, expiring: 0, expired: 0 };
  }
  
  return items.reduce((acc, item) => {
    const status = getItemStatus(item);
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, { fresh: 0, expiring: 0, expired: 0 });
};

export const getCompatibilityScore = (recipe, availableItems) => {
  if (!recipe || !recipe.ingredients || !Array.isArray(recipe.ingredients) || 
      !availableItems || !Array.isArray(availableItems)) {
    return 0;
  }
  
  if (recipe.ingredients.length === 0) return 0;
  
  const availableIngredients = recipe.ingredients.filter(ingredient =>
    availableItems.some(item => 
      item && item.name && ingredient && ingredient.name &&
      item.name.toLowerCase().includes(ingredient.name.toLowerCase())
    )
  );
  return Math.round((availableIngredients.length / recipe.ingredients.length) * 100);
};

// Context provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('smart-fridge-data');
    const savedTheme = localStorage.getItem('smart-fridge-theme');
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: ACTIONS.LOAD_DATA, payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
    
    if (savedTheme) {
      dispatch({ type: ACTIONS.SET_THEME, payload: savedTheme });
    }
    
    // Apply theme to document
    const theme = savedTheme || state.theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);
  
  // Save data to localStorage when state changes
  useEffect(() => {
    const dataToSave = {
      items: state.items,
      locations: state.locations,
      shoppingList: state.shoppingList,
      categories: state.categories
    };
    localStorage.setItem('smart-fridge-data', JSON.stringify(dataToSave));
  }, [state.items, state.locations, state.shoppingList, state.categories]);
  
  // Save theme to localStorage and apply to document
  useEffect(() => {
    localStorage.setItem('smart-fridge-theme', state.theme);
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);
  
  // Actions
  const actions = {
    // Theme
    toggleTheme: () => dispatch({ type: ACTIONS.TOGGLE_THEME }),
    setTheme: (theme) => dispatch({ type: ACTIONS.SET_THEME, payload: theme }),
    
    // Items
    addItem: (item) => dispatch({ type: ACTIONS.ADD_ITEM, payload: item }),
    updateItem: (item) => dispatch({ type: ACTIONS.UPDATE_ITEM, payload: item }),
    deleteItem: (id) => dispatch({ type: ACTIONS.DELETE_ITEM, payload: id }),
    bulkDeleteItems: (ids) => dispatch({ type: ACTIONS.BULK_DELETE_ITEMS, payload: ids }),
    
    // Locations
    addLocation: (location) => dispatch({ type: ACTIONS.ADD_LOCATION, payload: location }),
    updateLocation: (location) => dispatch({ type: ACTIONS.UPDATE_LOCATION, payload: location }),
    deleteLocation: (id) => dispatch({ type: ACTIONS.DELETE_LOCATION, payload: id }),
    
    // Shopping list
    addToShoppingList: (item) => dispatch({ type: ACTIONS.ADD_TO_SHOPPING_LIST, payload: item }),
    removeFromShoppingList: (id) => dispatch({ type: ACTIONS.REMOVE_FROM_SHOPPING_LIST, payload: id }),
    clearShoppingList: () => dispatch({ type: ACTIONS.CLEAR_SHOPPING_LIST }),
    
    // Filters
    setFilter: (key, value) => dispatch({ type: ACTIONS.SET_FILTER, payload: { key, value } }),
    clearFilters: () => dispatch({ type: ACTIONS.CLEAR_FILTERS }),
    
    // UI
    toggleSidebar: () => dispatch({ type: ACTIONS.TOGGLE_SIDEBAR }),
    setModal: (modal) => dispatch({ type: ACTIONS.SET_MODAL, payload: modal }),
    setSelectedItem: (item) => dispatch({ type: ACTIONS.SET_SELECTED_ITEM, payload: item }),
    setSelectedRecipe: (recipe) => dispatch({ type: ACTIONS.SET_SELECTED_RECIPE, payload: recipe }),
    setViewMode: (mode) => dispatch({ type: ACTIONS.SET_VIEW_MODE, payload: mode }),
    
    // Data
    resetData: () => dispatch({ type: ACTIONS.RESET_DATA })
  };
  
  const value = {
    ...state,
    ...actions,
    // Computed values
    filteredItems: state.items.filter(item => {
      const { location, category, status, search } = state.filters;
      
      if (location && item.location !== location) return false;
      if (category && item.category.toLowerCase() !== category.toLowerCase()) return false;
      if (status && getItemStatus(item) !== status) return false;
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
      
      return true;
    }),
    itemStats: getItemsByStatus(state.items),
    compatibleRecipes: state.recipes.map(recipe => ({
      ...recipe,
      compatibility: getCompatibilityScore(recipe, state.items)
    })).sort((a, b) => b.compatibility - a.compatibility)
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}