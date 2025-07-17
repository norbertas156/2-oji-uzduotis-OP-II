# 🍃 Smart Fridge - Kitchen Inventory Management

A modern, intuitive web application for managing your kitchen inventory, tracking expiration dates, and getting recipe recommendations based on available ingredients.

## ✨ Features

### 🥗 Inventory Management
- **Track Food Items**: Add, edit, and delete items with detailed information
- **Expiration Tracking**: Visual indicators for fresh, expiring, and expired items  
- **Smart Categories**: Organize items by category (Dairy, Meat, Vegetables, etc.)
- **Quantity Management**: Track quantities with flexible units
- **Search & Filter**: Find items quickly with powerful filtering options

### 🏠 Multiple Storage Locations
- **Flexible Storage**: Manage Refrigerator, Freezer, Pantry, Counter, and custom locations
- **Temperature Settings**: Configure temperature for each storage location
- **Visual Organization**: See items organized by storage location
- **Custom Locations**: Add your own storage spaces with custom icons and settings

### 👨‍🍳 Recipe Recommendations
- **Smart Suggestions**: Get recipe recommendations based on available ingredients
- **Compatibility Scoring**: See how many ingredients you have for each recipe
- **Shopping Lists**: View missing ingredients for recipes you want to make
- **Recipe Details**: Step-by-step instructions and ingredient lists
- **Difficulty Levels**: Recipes categorized by difficulty (Easy, Medium, Hard)

### ⏰ Expiration Management
- **Smart Alerts**: Visual warnings for items expiring soon or already expired
- **Timeline Tracking**: See expiration dates with color-coded status
- **Automatic Calculations**: Days until expiration calculated automatically
- **Purchase Date Tracking**: Know how long items have been stored

### 📊 Dashboard & Analytics
- **Overview Dashboard**: Quick stats and important alerts
- **Usage Statistics**: Track your inventory patterns
- **Storage Analytics**: See how items are distributed across locations
- **Visual Charts**: Progress bars and status indicators

### ⚙️ Data Management
- **Local Storage**: All data stored securely in your browser
- **Export/Import**: Backup and restore your data
- **Data Statistics**: View detailed information about your inventory
- **Privacy First**: No data sent to external servers

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project files**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 Usage Guide

### Adding Items
1. Click the "Add Item" button on the Dashboard or Inventory page
2. Fill in the item details:
   - **Name**: Item name (e.g., "Organic Milk")
   - **Category**: Select from predefined categories
   - **Quantity & Unit**: Amount and measurement unit
   - **Storage Location**: Choose where the item is stored
   - **Purchase Date**: When you bought the item
   - **Expiration Date**: When the item expires
   - **Icon**: Choose a visual representation

### Managing Storage Locations
1. Go to the "Storage Locations" page
2. Add custom locations with:
   - **Name**: Location name (e.g., "Wine Cellar")
   - **Icon**: Visual representation
   - **Temperature**: Storage temperature
   - **Description**: Additional notes

### Getting Recipe Recommendations
1. Visit the "Recipes" page
2. See recipes sorted by compatibility with your inventory
3. Filter by:
   - **Can Make Now**: Recipes with all ingredients available
   - **Need Few Items**: Recipes missing only 1-2 ingredients
4. Click on a recipe to see detailed instructions

### Tracking Expiration Dates
- **Green**: Fresh items (7+ days until expiration)
- **Yellow**: Expiring this week (3-7 days)
- **Orange**: Expiring soon (1-3 days)
- **Red**: Expired items

## 🎨 Screenshots

### Dashboard
- Overview of your kitchen inventory
- Quick stats and recent alerts
- Recipe recommendations
- Storage location overview

### Inventory Management
- Beautiful grid layout of all items
- Filtering and search capabilities
- Expiration status indicators
- Easy edit and delete actions

### Recipe Recommendations
- Smart recipe suggestions
- Ingredient compatibility scoring
- Missing ingredient lists
- Detailed cooking instructions

### Storage Locations
- Visual organization of storage spaces
- Usage statistics for each location
- Easy management of custom locations

## 🛠️ Technology Stack

- **Frontend**: React 18 with hooks
- **Styling**: Tailwind CSS for modern UI
- **Icons**: Lucide React for beautiful icons
- **Routing**: React Router for navigation
- **Date Handling**: date-fns for date operations
- **Build Tool**: Vite for fast development
- **Storage**: Local Storage for data persistence

## 📂 Project Structure

```
smart-fridge-app/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Sidebar.jsx
│   │   ├── ItemModal.jsx
│   │   └── LocationModal.jsx
│   ├── pages/              # Main application pages
│   │   ├── Dashboard.jsx
│   │   ├── Inventory.jsx
│   │   ├── Recipes.jsx
│   │   ├── StorageLocations.jsx
│   │   └── Settings.jsx
│   ├── context/            # React context for state management
│   │   └── FridgeContext.jsx
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md            # This file
```

## 🔧 Configuration

### Customizing Categories
Edit the categories array in `src/components/ItemModal.jsx`:
```javascript
const categories = [
  'Dairy', 'Meat', 'Vegetables', 'Fruits', 'Bakery', 
  'Beverages', 'Snacks', 'Frozen', 'Pantry', 'Condiments', 'Other'
]
```

### Adding New Units
Modify the units array in `src/components/ItemModal.jsx`:
```javascript
const units = [
  'pieces', 'grams', 'kg', 'ml', 'liter', 'cups', 
  'tbsp', 'tsp', 'oz', 'lbs', 'cans', 'bottles', 'packages', 'slices'
]
```

### Customizing Expiration Thresholds
Adjust the expiration logic in `src/context/FridgeContext.jsx`:
```javascript
export const getExpirationStatus = (expirationDate) => {
  // Customize the day thresholds here
  if (daysUntilExpiration <= 3) {
    return { status: 'expiring-soon', days: daysUntilExpiration, color: 'warning' }
  }
  // ... more conditions
}
```

## 🎯 Features in Detail

### Smart Recipe System
The recipe recommendation system analyzes your current inventory and:
- Calculates compatibility percentage for each recipe
- Identifies missing ingredients
- Sorts recipes by how many ingredients you have
- Provides shopping lists for missing items

### Expiration Management
The app automatically:
- Calculates days until expiration
- Color-codes items based on freshness
- Shows expired items prominently
- Tracks purchase dates for better planning

### Data Persistence
- All data stored locally in browser's localStorage
- Automatic saving after each change
- Export functionality for backups
- Import capability to restore data

## 🌟 Pro Tips

1. **Regular Updates**: Update quantities as you use items
2. **Batch Entry**: Add multiple items after grocery shopping
3. **Check Expiration**: Review the dashboard regularly for alerts
4. **Recipe Planning**: Use recipe recommendations for meal planning
5. **Backup Data**: Export your data regularly as backup

## 🤝 Contributing

This is a standalone application, but you can customize it for your needs:

1. Fork the project
2. Create your feature branch
3. Make your changes
4. Test thoroughly
5. Submit your improvements

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Icons provided by Lucide React
- UI components styled with Tailwind CSS
- Date handling powered by date-fns
- Built with React and Vite

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Ensure you're using a modern browser
3. Try clearing browser cache and localStorage
4. Verify all dependencies are installed correctly

---

**Happy cooking and organized kitchen management! 🍳✨**
