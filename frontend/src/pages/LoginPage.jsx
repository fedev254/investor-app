// src/pages/LoginPage.jsx

// --- STEP 1: CONSOLIDATED IMPORTS ---
// All imports are now cleanly organized at the top of the file.
// We only import 'React' and its hooks ONCE.
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import our custom context and styles
import AuthContext from '../context/AuthContext';
import styles from './LoginPage.module.css';

function LoginPage() {
    // --- STEP 2: RESTORED STATE DECLARATIONS ---
    // These lines were missing in your provided code but are essential for the component to work.
    const [username, setUsername]  = useState('');
    const [password, setPassword]  = useState('');
    const [error, setError]        = useState('');

    // Get the login function from our global AuthContext
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // The handleLogin function remains the same, as its logic is correct.
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:8000/api/token/', { username, password });
            if (response.status === 200) {
                // Use the login function from our context to update the global state
                login(response.data.access, response.data.refresh);
                navigate('/dashboard'); // Navigate to the main dashboard after successful login
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error(err);
        }
    };

    // The JSX (the visual part) is correct and does not need changes.
    return (
        <div className={styles.loginPageContainer}>
            <div className={styles.card}>
                <h3 className={styles.title}>Account Login</h3>
                <form onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <input
                            type="text"
                            id="username"
                            className={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;