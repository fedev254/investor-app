// in frontend/src/components/Header.jsx (Example)
import React from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons

const Header = ({ toggleSidebar, isSidebarOpen, user }) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                {/* This button is only visible on mobile */}
                <button className={styles.menuToggle} onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
                </button>
                <div className={styles.brand}>InfinTech Overview</div>
                {/* You can add user info or other items here */}
            </div>
        </header>
    );
}

export default Header;