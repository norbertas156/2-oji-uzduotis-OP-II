# 🚀 Smart Fridge - Quick Setup Guide

## Prerequisites
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

## Quick Installation

1. **Download the project**
   - Download this folder or clone the repository
   - Extract if downloaded as ZIP

2. **Open terminal/command prompt**
   - Navigate to the project folder:
     ```bash
     cd smart-fridge-app
     ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Visit: `http://localhost:3000`
   - The app will automatically open in your default browser

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run code linting

## Troubleshooting

### Common Issues:

**Port already in use:**
```bash
# Kill the process using port 3000
npx kill-port 3000
# Then run again
npm run dev
```

**Dependencies not installing:**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Browser not opening automatically:**
- Manually visit `http://localhost:3000`
- Try `http://localhost:5173` if the port is different

### System Requirements:
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Browser**: Chrome, Firefox, Safari, or Edge (modern versions)

## First Time Usage

1. **Dashboard**: Start here to see the overview
2. **Add Items**: Click "Add Item" to add your first food items
3. **Storage Locations**: Configure your kitchen storage spaces
4. **Recipes**: Get cooking recommendations based on your inventory

## Data Storage

- All data is stored locally in your browser
- Use Settings → Export to backup your data
- Import functionality available to restore data

## Need Help?

Check the main README.md file for detailed documentation and features explanation.

---

**Happy cooking! 🍳✨**