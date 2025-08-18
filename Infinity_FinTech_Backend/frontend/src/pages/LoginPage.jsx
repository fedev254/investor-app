// src/pages/LoginPage.jsx

// --- IMPORTS ---
// Your imports remain exactly the same.
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import styles from './LoginPage.module.css';

function LoginPage() {
    // --- STATE AND CONTEXT ---
    // Your state declarations and context usage remain exactly the same.
    const [username, setUsername]  = useState('');
    const [password, setPassword]  = useState('');
    const [error, setError]        = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // --- THIS IS THE ONLY CHANGE ---
            // 1. We read the VITE_API_BASE_URL from the environment.
            //    If it's not set (like in local development), it defaults to localhost.
            const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

            // 2. We use that variable to construct the full, correct URL for the API call.
            const response = await axios.post(`${apiUrl}/api/token/`, { username, password });
            
            // The rest of your logic remains exactly the same.
            if (response.status === 200) {
                login(response.data.access, response.data.refresh);
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error(err);
        }
    };

    // --- JSX (VISUALS) ---
    // Your visual structure remains exactly the same.
    return (
        <div className={styles.loginPageContainer}>
            <div className={styles.card}>
                <h3 className={styles.title}>Login</h3>
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