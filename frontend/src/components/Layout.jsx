// src/components/Layout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header'; // Import the new mobile header
import styles from './Layout.module.css';

function Layout({ children }) {
    // --- NEW: State to control sidebar visibility ---
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // This function will be passed to the Header component
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={styles.layout}>
            {/* The Sidebar will now have a prop to control its "open" state */}
            <Sidebar isOpen={isSidebarOpen} />

            <div className={styles.main}>
                {/* The Header is the mobile-only top bar with the menu button */}
                <Header onMenuClick={toggleSidebar} />

                {/* The page content (Dashboard, etc.) is rendered here */}
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}
export default Layout;