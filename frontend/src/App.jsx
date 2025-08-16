// src/App.jsx - The final and correct routing architecture

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import all your major components
import Layout from './components/Layout';         // The layout WITH the sidebar
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import MainDashboard from './pages/MainDashboard';
// Assuming your other dashboards exist, let's import them
import CashierDashboard from './pages/CashierDashboard';
import InvestorDashboard from './pages/InvestorDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- ROUTE GROUP 1: Public Routes --- */}
        {/* These routes are for anyone. They do NOT use the main app Layout. */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* --- ROUTE GROUP 2: Private / Protected Routes --- */}
        {/* This is a wrapper route. Any route inside here will be protected
            and will automatically render inside our main <Layout> component. */}
        <Route 
          path="/*" // Match any path that wasn't matched above
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  {/* Define all your protected pages inside this nested router */}
                  <Route path="/dashboard" element={<MainDashboard />} />
                  <Route path="/investor-dashboard" element={<InvestorDashboard />} />
                  <Route path="/cashier-dashboard" element={<CashierDashboard />} />
                  
                  {/* The default redirect if the user is logged in but at a non-existent path */}
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;