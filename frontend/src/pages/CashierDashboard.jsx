// src/pages/CashierDashboard.jsx
import React, { useState, useContext } from 'react';
import api from '../services/api'; // Use our central, authenticated API service
import styles from './CashierDashboard.module.css';
import AuthContext from '../context/AuthContext';

function CashierDashboard() {
    const { user } = useContext(AuthContext);

    // Form state management
    const [totalSales, setTotalSales] = useState('');
    const [expenditure, setExpenditure] = useState('');
    const [receipt, setReceipt] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback({ message: '', type: '' });

        const formData = new FormData();
        formData.append('total_sales', totalSales);
        formData.append('expenditure', expenditure);
        if (receipt) {
            formData.append('receipt_image', receipt);
        }

        try {
            // --- THIS IS THE CRITICAL FIX ---
            // The URL now perfectly matches your Django urls.py configuration.
            // ('/v1' is part of the path because our baseURL in api.js is '.../api')
            const response = await api.post('/cashier/submit-sale/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 201) { // 201 "Created" is the correct success status for a POST
                setFeedback({ message: 'Report submitted successfully!', type: 'success' });
                // Clear the form for the next entry
                setTotalSales('');
                setExpenditure('');
                setReceipt(null);
                setFileInputKey(Date.now());
            }
        } catch (error) {
            console.error('Submission failed:', error);
            setFeedback({ message: 'Submission failed. Please try again.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return <div className={styles.container}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <h1 className={styles.header}>Daily Sales Report</h1>
                <p className={styles.subheader}>
                    Welcome, {user.first_name || user.username}. Please complete your report for today.
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Your form JSX remains the same */}
                <div className={styles.formGroup}>
                    <label htmlFor="totalSales">Total Sales + Starting Cash</label>
                    <input type="number" id="totalSales" value={totalSales} onChange={(e) => setTotalSales(e.target.value)} disabled={isSubmitting} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="expenditure">Total Expenditure</label>
                    <input type="number" id="expenditure" value={expenditure} onChange={(e) => setExpenditure(e.target.value)} disabled={isSubmitting} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="receipt">Upload Deposit Receipt</label>
                    <input type="file" id="receipt" key={fileInputKey} onChange={(e) => setReceipt(e.target.files[0])} disabled={isSubmitting} />
                </div>
                {feedback.message && (
                    <div className={feedback.type === 'success' ? styles.feedbackSuccess : styles.feedbackError}>
                        {feedback.message}
                    </div>
                )}
                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
            </form>
        </div>
    );
}

export default CashierDashboard;