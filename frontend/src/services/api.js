// in frontend/src/services/api.js

import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  // Use the baseURL variable, and add the required /api/v1 prefix
  baseURL: `${baseURL}/api/v1`,
});

// This interceptor automatically adds your login token to every API request.
// This code is already correct and does not need to be changed.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;