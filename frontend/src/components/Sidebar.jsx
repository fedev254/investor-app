// src/components/Sidebar.jsx
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import defaultAvatar from '../assets/default-avatar.png';
import styles from './Sidebar.module.css';
import logo from '../assets/logo.png';

const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 
             2 0 0 1 0 2.83 2 2 0 0 1-2.83 
             0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 
             1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 
             1-2 2 2 2 0 0 1-2-2v-.09A1.65 
             1.65 0 0 0 9 19.4a1.65 1.65 0 0 
             0-1.82.33l-.06.06a2 2 0 0 1-2.83 
             0 2 2 0 0 1 0-2.83l.06-.06a1.65 
             1.65 0 0 0 .33-1.82 1.65 1.65 
             0 0 0-1.51-1H3a2 2 0 0 1-2-2 
             2 2 0 0 1 2-2h.09A1.65 1.65 0 0 
             0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 
             2 0 0 1 0-2.83 2 2 0 0 1 2.83 
             0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 
             1.65 0 0 0 1-1.51V3a2 2 0 0 1 
             2-2 2 2 0 0 1 2 2v.09a1.65 
             1.65 0 0 0 1 1.51 1.65 1.65 
             0 0 0 1.82-.33l.06-.06a2 2 
             0 0 1 2.83 0 2 2 0 0 1 0 
             2.83l-.06.06a1.65 1.65 0 0 
             0-.33 1.82V9a1.65 1.65 0 0 
             0 1.51 1H21a2 2 0 0 1 2 
             2 2 2 0 0 1-2 2h-.09a1.65 
             1.65 0 0 0-1.51 1z">
    </path>
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 
             2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" x2="9" y1="12" y2="12"></line>
  </svg>
);

function Sidebar({ isOpen }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isLoggedIn = !!user;

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.brand}>
        <img src={logo} alt="InfinTech Makers Logo" />
        <span>InfinTech</span>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          <DashboardIcon /> <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          <SettingsIcon /> <span>Settings</span>
        </NavLink>
      </nav>

      <div className={styles.footer}>
        {isLoggedIn && (
          <>
            <div className={styles.userProfile}>
              <img
                src={user.avatar_url ? `http://localhost:8000${user.avatar_url}` : defaultAvatar}
                alt="User Avatar"
                className={styles.avatar}
              />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.first_name || user.username}</span>
                <span className={styles.userRole}>{user.role}</span>
              </div>
            </div>

            <button onClick={handleLogout} className={styles.logoutButton}>
              <LogoutIcon /> <span>Logout</span>
            </button>
          </>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
