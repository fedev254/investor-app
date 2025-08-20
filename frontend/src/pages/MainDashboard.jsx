// src/pages/MainDashboard.jsx

// --- IMPORTS ---
// Your existing imports.
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import CashierDashboard from './CashierDashboard';
import InvestorDashboard from './InvestorDashboard';

// Import the new Footer component.
import Footer from '../components/Footer';

// A simple component for a clean loading screen.
const LoadingScreen = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

function MainDashboard() {
    // --- USER AND LOGIC ---
    // This section is exactly as you provided. It's clean and works well.
    const { user } = useContext(AuthContext);

    if (!user) {
        return <LoadingScreen />;
    }

    let DashboardComponent; // Variable to hold which dashboard to render.
    if (user.role === 'cashier') {
        DashboardComponent = <CashierDashboard />;
    }
    else if (user.role === 'investor' || user.role === 'admin') {
        DashboardComponent = <InvestorDashboard />;
    }
    else {
        DashboardComponent = <div>Error: User role is unknown. Please contact support.</div>;
    }

    // --- RENDERED OUTPUT WITH FOOTER ---
    // The component now returns a flex container to ensure the footer is
    // correctly positioned at the bottom of the viewport.
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* The 'flex: 1' style on the main element makes it expand to fill available space,
                pushing the footer down. */}
            <main style={{ flex: '1' }}>
                {DashboardComponent}
            </main>
            
            {/* The Footer component is added here, outside the main content area. */}
            <Footer />
        </div>
    );
}

export default MainDashboard;