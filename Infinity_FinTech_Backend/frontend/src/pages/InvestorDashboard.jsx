// src/pages/InvestorDashboard.jsx

import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import styles from './InvestorDashboard.module.css';

// Reusable KPI Card component (Your code - unchanged and correct)
const KpiCard = ({ title, value, color }) => (
    <div className={`${styles.kpiCard} ${styles[color]}`}>
        <div className={styles.kpiTitle}>{title}</div>
        <div className={styles.kpiValue}>{value}</div>
    </div>
);

// Helper function for formatting currency (Your code - unchanged and correct)
const formatCurrency = (amount) => {
    const numericAmount = Number(amount) || 0;
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(numericAmount);
};

// Helper function for formatting dates (Your code - unchanged and correct)
const formatDate = (dateString) => {
    if (!dateString) return 'No sales yet';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};


function InvestorDashboard() {
    // Your state management logic is perfect.
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // --- FIX #1: CORRECTED THE API ENDPOINT URL ---
                // The URL must match our versioned API structure.
                const response = await api.get('/investor/dashboard/');
                setDashboardData(response.data);
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
                setError("Could not load dashboard data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) return <div className={styles.container}><h2>Loading Dashboard...</h2></div>;
    if (error) return <div className={styles.container}><p className="text-danger">{error}</p></div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Welcome, {user.first_name || user.username}</h1>
            
            <div className={styles.kpiGrid}>
                <KpiCard title="Total Shops" value={dashboardData.total_shops} color="primary" />
                <KpiCard title="Total Profit (All Time)" value={formatCurrency(dashboardData.total_profit_all_time)} color="success" />
            </div>

            <div className={styles.tableCard}>
                <h2 className={styles.tableTitle}>Shop Performance Overview</h2>
                <div className="table-responsive">
                    <table className={`table ${styles.table}`}>
                        <thead>
                            <tr>
                                <th>Shop Name</th>
                                <th>Location</th>
                                <th>Assigned Cashier</th>
                                <th>Latest Sale Date</th>
                                <th className="text-end">Today's Profit</th>
                                {/* --- FIX #2: ADDED THE "RECEIPT" TABLE HEADER --- */}
                                <th className="text-center">Receipt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.shops_performance.map(shop => (
                                <tr key={shop.id}>
                                    <td>{shop.name}</td>
                                    <td>{shop.location}</td>
                                    <td>{shop.cashier_name}</td>
                                    <td>{formatDate(shop.latest_sale_date)}</td>
                                    <td className={`text-end ${parseFloat(shop.todays_profit) >= 0 ? styles.profit : styles.loss}`}>
                                        {formatCurrency(shop.todays_profit)}
                                    </td>
                                    
                                    {/* --- FIX #2: ADDED THE "RECEIPT" TABLE DATA CELL --- */}
                                    <td className="text-center">
                                        {/* This will only show a button if a receipt URL exists for today's sale */}
                                        {shop.todays_receipt_url ? (
                                            <a 
                                                href={shop.todays_receipt_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className={styles.receiptLink}
                                            >
                                                View
                                            </a>
                                        ) : (
                                            <span className={styles.noReceipt}>N/A</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default InvestorDashboard;