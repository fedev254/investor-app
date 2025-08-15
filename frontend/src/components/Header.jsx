// src/components/Header.jsx
import React from 'react';
import styles from './Header.module.css'; // New dedicated styles

// A simple SVG for the "Hamburger" menu icon
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

// This component receives a function to call when the menu button is clicked
function Header({ onMenuClick }) {
    return (
        <header className={styles.header}>
            <button className={styles.menuButton} onClick={onMenuClick}>
                <MenuIcon />
            </button>
            <div className={styles.brand}>InfinTech Makers</div>
        </header>
    );
}
export default Header;