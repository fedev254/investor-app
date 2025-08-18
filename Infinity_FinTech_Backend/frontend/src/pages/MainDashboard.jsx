// src/pages/MainDashboard.jsx

import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext'; // We'll use the user from the context
import CashierDashboard from './CashierDashboard';
import InvestorDashboard from './InvestorDashboard';

function MainDashboard() {
    // Get the user object directly from our global AuthContext.
    // This is cleaner and more reliable than decoding the token again.
    const { user } = useContext(AuthContext);

    // If the user data is still loading (from the context), show a loading message.
    if (!user) {
        return <div>Loading...</div>;
    }

    // Now, render the correct component based on the user's role.
    if (user.role === 'cashier') {
        return <CashierDashboard />;
    } 
    else if (user.role === 'investor' || user.role === 'admin') {
        return <InvestorDashboard />;
    } 
    else {
        // This is a good fallback for unexpected situations.
        return <div>Error: User role is unknown. Please contact support.</div>;
    }
}

export default MainDashboard;