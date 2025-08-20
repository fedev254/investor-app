// in frontend/src/components/Layout.jsx

import React, { useState, useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import AuthContext from '../context/AuthContext';
import styles from './Layout.module.css';

const Layout = () => {
    const { user } = useContext(AuthContext);
    const [isSidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility

    if (!user) {
        return <Navigate to="/login" />;
    }

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={styles.appContainer}>
            {/* Pass the toggle function and state to the Header */}
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            
            <div className={styles.layoutContainer}>
                {/* Add a class to the sidebar based on its state */}
                <div className={`${styles.sidebarWrapper} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
                    <Sidebar />
                </div>
                
                <div className={styles.contentAndFooterWrapper}>
                    <main className={styles.mainContent}>
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Layout;