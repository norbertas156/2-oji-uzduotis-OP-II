# 📁 Smart Fridge - Project Structure

```
smart-fridge-app/
├── 📄 README.md                    # Complete documentation
├── 📄 SETUP.md                     # Quick setup guide
├── 📄 LICENSE                      # MIT License
├── 📄 .gitignore                   # Git ignore rules
├── 📄 .eslintrc.js                 # ESLint configuration
├── 📄 package.json                 # Dependencies and scripts
├── 📄 package-lock.json            # Dependency lock file
├── 📄 vite.config.js               # Vite build configuration
├── 📄 tailwind.config.js           # Tailwind CSS configuration
├── 📄 postcss.config.js            # PostCSS configuration
├── 📄 index.html                   # Main HTML template
├── 📁 public/                      # Static assets
│   └── 📄 fridge-icon.svg         # App icon
└── 📁 src/                        # Source code
    ├── 📄 main.jsx                # App entry point
    ├── 📄 App.jsx                 # Main app component
    ├── 📄 index.css               # Global styles
    ├── 📁 components/             # Reusable components
    │   ├── 📄 Sidebar.jsx         # Navigation sidebar
    │   ├── 📄 ItemModal.jsx       # Add/edit items modal
    │   └── 📄 LocationModal.jsx   # Add/edit locations modal
    ├── 📁 context/                # React context
    │   └── 📄 FridgeContext.jsx   # App state management
    └── 📁 pages/                  # Main application pages
        ├── 📄 Dashboard.jsx       # Overview dashboard
        ├── 📄 Inventory.jsx       # Item management
        ├── 📄 Recipes.jsx         # Recipe recommendations
        ├── 📄 StorageLocations.jsx # Location management
        └── 📄 Settings.jsx        # App settings
```

## 🔧 Key Files Explained

### Configuration Files
- **package.json**: Project dependencies, scripts, and metadata
- **vite.config.js**: Build tool configuration for fast development
- **tailwind.config.js**: CSS framework configuration for styling
- **.eslintrc.js**: Code linting rules for better code quality

### Source Code
- **main.jsx**: Application entry point that renders the React app
- **App.jsx**: Main component with routing and layout structure
- **FridgeContext.jsx**: Central state management for all app data

### Components
- **Sidebar.jsx**: Navigation menu for different app sections
- **ItemModal.jsx**: Form for adding/editing food items
- **LocationModal.jsx**: Form for adding/editing storage locations

### Pages
- **Dashboard.jsx**: Home page with overview and quick stats
- **Inventory.jsx**: Complete item management with search/filter
- **Recipes.jsx**: Smart recipe recommendations
- **StorageLocations.jsx**: Manage different storage spaces
- **Settings.jsx**: App configuration and data management

## 🚀 Getting Started

1. Ensure you have Node.js installed (version 16+)
2. Open terminal and navigate to this folder
3. Run: `npm install`
4. Run: `npm run dev`
5. Open: `http://localhost:3000`

## 📦 Technologies Used

- **React 18**: Frontend framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **React Router**: Navigation and routing
- **date-fns**: Date manipulation utilities

---

**Ready to manage your kitchen inventory! 🍳✨**