// src/components/Layout.jsx

// Your existing imports.
import React, { useContext } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import AuthContext from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

// We just need to import the Footer.
import Footer from './Footer';

const Layout = () => {
    const { user } = useContext(AuthContext);

    // Your existing user check for authentication. This is perfect.
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Your existing JSX structure is great. We will just wrap it to manage the footer position.
    return (
        // --- EDIT START ---
        // This outer div now uses flexbox to position the footer correctly.
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            
            <Header /> {/* Your existing header */}

            {/* 'flex: 1' makes this middle area grow to push the footer down */}
            <div className={styles.layoutContainer} style={{ flex: '1' }}>
                <Sidebar /> {/* Your existing sidebar */}
                
                {/* Your main content area where pages are rendered */}
                <main className={styles.mainContent}>
                    <Outlet /> 
                </main>
            </div>
            
            <Footer /> {/* The Footer component is added here at the end. */}

        </div>
        // --- EDIT END ---
    );
};

export default Layout;