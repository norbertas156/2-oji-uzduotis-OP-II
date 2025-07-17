import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Recipes from './pages/Recipes';
import Locations from './pages/Locations';
import Shopping from './pages/Shopping';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { useApp } from './context/AppContext';

// Main layout component
function AppLayout() {
  const { ui } = useApp();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="flex">
        <Sidebar />
        
        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          ui.sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'
        }`}>
          <Routes>
            <Route path="/" element={
              <>
                <TopBar title="Dashboard" />
                <main className="flex-1">
                  <Dashboard />
                </main>
              </>
            } />
            
            <Route path="/inventory" element={
              <>
                <TopBar title="Inventory" showFilters={true} breadcrumbs={['Home', 'Inventory']} />
                <main className="flex-1">
                  <Inventory />
                </main>
              </>
            } />
            
            <Route path="/recipes" element={
              <>
                <TopBar title="Recipes" showFilters={true} breadcrumbs={['Home', 'Recipes']} />
                <main className="flex-1">
                  <Recipes />
                </main>
              </>
            } />
            
            <Route path="/locations" element={
              <>
                <TopBar title="Storage Locations" breadcrumbs={['Home', 'Locations']} />
                <main className="flex-1">
                  <Locations />
                </main>
              </>
            } />
            
            <Route path="/shopping" element={
              <>
                <TopBar title="Shopping List" breadcrumbs={['Home', 'Shopping']} />
                <main className="flex-1">
                  <Shopping />
                </main>
              </>
            } />
            
            <Route path="/analytics" element={
              <>
                <TopBar title="Analytics" breadcrumbs={['Home', 'Analytics']} />
                <main className="flex-1">
                  <Analytics />
                </main>
              </>
            } />
            
            <Route path="/settings" element={
              <>
                <TopBar title="Settings" breadcrumbs={['Home', 'Settings']} />
                <main className="flex-1">
                  <Settings />
                </main>
              </>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
      
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            border: '1px solid var(--toast-border)',
            borderRadius: '0.5rem',
            fontSize: '14px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
}

// Root App component
function App() {
  return (
    <AppProvider>
      <Router>
        <AppLayout />
      </Router>
    </AppProvider>
  );
}

export default App;
