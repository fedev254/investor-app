// src/services/api.js
import axios from 'axios';

const api = axios.create({
    // --- THIS IS THE FIX ---
    // The baseURL should include the versioning, so you never have to type it again.
    baseURL: 'http://localhost:8000/api/v1', 
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;