// in frontend/src/components/Layout.jsx

import React, { useState, useEffect, useContext } from 'react'; // Add useEffect
import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import AuthContext from '../context/AuthContext';
import styles from './Layout.module.css';

const Layout = () => {
    const { user } = useContext(AuthContext);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // This effect adds/removes a class to the body to prevent scrolling when menu is open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.classList.add(styles.bodyNoScroll);
        } else {
            document.body.classList.remove(styles.bodyNoScroll);
        }
    }, [isSidebarOpen]);

    if (!user) {
        return <Navigate to="/login" />;
    }

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={styles.appContainer}>
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            
            {/* The Overlay is only visible when the sidebar is open on mobile */}
            {isSidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}

            <div className={styles.layoutContainer}>
                {/* Apply the 'open' class based on the state */}
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