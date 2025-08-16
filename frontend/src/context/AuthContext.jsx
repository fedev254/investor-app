// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check if token is expired
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(decoded);
                } else {
                    // Handle token refresh in a real app
                    localStorage.clear();
                }
            } catch (error) {
                localStorage.clear();
            }
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('access_token', token);
        const decoded = jwtDecode(token);
        setUser(decoded);
        api.defaults.headers.Authorization = `Bearer ${token}`;
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        delete api.defaults.headers.Authorization;
    };

    const authContextValue = { user, login, logout, loading };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;