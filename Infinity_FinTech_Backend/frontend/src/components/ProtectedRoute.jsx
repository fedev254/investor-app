// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// The 'children' prop is the component this route is protecting (e.g., MainDashboard)
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('access_token');

    // If there's no token, redirect the user to the login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If there is a token, render the child component as requested
    return children;
}

export default ProtectedRoute;