// src/App.jsx - Edited for clarity and to ensure layout consistency

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import your components and pages
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import MainDashboard from './pages/MainDashboard';
// Your existing dashboard imports
import CashierDashboard from './pages/CashierDashboard';
import InvestorDashboard from './pages/InvestorDashboard';
// Assuming your ProtectedRoute component simply checks for authentication
import ProtectedRoute from './components/ProtectedRoute'; 

// --- EDIT: For clarity, we can wrap our protected routes within the layout.
// This new component helps structure our protected routes cleanly.
const ProtectedRoutesWithLayout = () => (
    <ProtectedRoute>
        <Layout>
            <Outlet /> {/* The nested route components will render here */}
        </Layout>
    </ProtectedRoute>
);

// We'll also need to import Outlet for this to work
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Route: Login Page --- */}
        {/* Anyone can access this page. */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* --- Protected Routes --- */}
        {/* This is a wrapper route. Any nested routes inside will be protected by
            your ProtectedRoute component and automatically rendered within the Layout. */}
        <Route element={<ProtectedRoutesWithLayout />}>
            <Route path="/dashboard" element={<MainDashboard />} />
            <Route path="/investor-dashboard" element={<InvestorDashboard />} />
            <Route path="/cashier-dashboard" element={<CashierDashboard />} />

            {/* You can add more protected routes here later */}
            {/* e.g., <Route path="/profile" element={<ProfilePage />} /> */}
        </Route>

        {/* --- Default Route Redirect --- */}
        {/* If someone lands on the root URL "/", it redirects to "/dashboard".
            The dashboard route will then handle the auth check. */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        {/* Optional: A catch-all route for any undefined paths */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;