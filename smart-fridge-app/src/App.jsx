import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import Recipes from './pages/Recipes'
import StorageLocations from './pages/StorageLocations'
import Settings from './pages/Settings'
import { FridgeProvider } from './context/FridgeContext'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <FridgeProvider>
      <Router>
        <div className="flex h-screen bg-gray-50">
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
              <div className="container mx-auto px-6 py-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/recipes" element={<Recipes />} />
                  <Route path="/locations" element={<StorageLocations />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </FridgeProvider>
  )
}

export default App