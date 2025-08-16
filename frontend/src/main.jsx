// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// --- IMPORT THE AUTH PROVIDER ---
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* --- WRAP THE APP --- */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);