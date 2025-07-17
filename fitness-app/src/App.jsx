import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import WorkoutPlan from './components/WorkoutPlan';
import Analytics from './components/Analytics';
import AddWorkout from './components/AddWorkout';
import { FitnessProvider } from './context/FitnessContext';

function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <div className="nav-brand">💪 Fitness Tracker</div>
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Workout Plan
            </Link>
            <Link 
              to="/add-workout" 
              className={`nav-link ${isActive('/add-workout') ? 'active' : ''}`}
            >
              Add Workout
            </Link>
            <Link 
              to="/analytics" 
              className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}
            >
              Analytics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <FitnessProvider>
      <Router>
        <div className="App">
          <Navigation />
          <div className="container">
            <Routes>
              <Route path="/" element={<WorkoutPlan />} />
              <Route path="/add-workout" element={<AddWorkout />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </div>
      </Router>
    </FitnessProvider>
  );
}

export default App;