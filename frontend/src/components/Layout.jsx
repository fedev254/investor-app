// src/components/Layout.jsx -- CORRECTED VERSION

import React, { useContext } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import AuthContext from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

// We still import the footer.
import Footer from './Footer';

const Layout = () => {
    const { user } = useContext(AuthContext);

    // This user check is correct.
    if (!user) {
        return <Navigate to="/login" />;
    }

    // --- THIS IS THE CORRECTED JSX STRUCTURE ---
    // We go back to your original structure and simply add the Footer at the end.
    return (
        <> {/* A React Fragment is used to group elements without adding an extra div */}
            <Header />

            <div className={styles.layoutContainer}>
                <Sidebar />
                
                {/* We create a new inner wrapper here for the main content and footer */}
                <div className={styles.contentAndFooterWrapper}>
                    {/* Your main content area where pages will render */}
                    <main className={styles.mainContent}>
                        <Outlet />
                    </main>

                    {/* The footer is placed here, so it is part of the right-hand
                        column but appears after the main content */}
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Layout;