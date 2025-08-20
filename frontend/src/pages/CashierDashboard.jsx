// in frontend/src/pages/CashierDashboard.jsx

import React, { useState, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import styles from './CashierDashboard.module.css'; // We'll create a new CSS file for this

function CashierDashboard() {
    // State to hold the values from the form inputs
    const [totalSales, setTotalSales] = useState('');
    const [expenditure, setExpenditure] = useState('');
    const [receiptImage, setReceiptImage] = useState(null);
    
    // State to manage feedback to the user
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { user } = useContext(AuthContext); // Get the logged-in user details

    // Function to handle the file input change
    const handleFileChange = (event) => {
        setReceiptImage(event.target.files[0]);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        // Use FormData because we are sending a file
        const formData = new FormData();
        formData.append('total_sales', totalSales);
        formData.append('expenditure', expenditure);
        if (receiptImage) {
            formData.append('receipt_image', receiptImage);
        }

        try {
            // Send the data to our Django API endpoint for cashiers
            await api.post('/cashier/submit-sale/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccessMessage('Report submitted successfully!');
            // Reset the form after successful submission
            setTotalSales('');
            setExpenditure('');
            setReceiptImage(null);
            event.target.reset(); // This clears the file input
        } catch (err) {
            setErrorMessage('Submission failed. Please check the values and try again.');
            console.error('Submission error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Daily Sales Report</h1>
            <p className={styles.welcomeMessage}>Welcome, {user?.first_name || user?.username}. Please submit your report.</p>

            <div className={styles.formCard}>
                <form onSubmit={handleSubmit}>
                    
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <div className="mb-3">
                        <label htmlFor="totalSales" className="form-label fw-bold">Total Sales (KES)</label>
                        <input
                            type="number"
                            step="0.01"
                            id="totalSales"
                            className="form-control form-control-lg"
                            value={totalSales}
                            onChange={(e) => setTotalSales(e.target.value)}
                            placeholder="e.g., 15000.00"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expenditure" className="form-label fw-bold">Total Expenditure (KES)</label>
                        <input
                            type="number"
                            step="0.01"
                            id="expenditure"
                            className="form-control form-control-lg"
                            value={expenditure}
                            onChange={(e) => setExpenditure(e.target.value)}
                            placeholder="e.g., 2500.00"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="receiptImage" className="form-label fw-bold">Upload Deposit Receipt (Optional)</label>
                        <input
                            type="file"
                            id="receiptImage"
                            className="form-control"
                            onChange={handleFileChange}
                            accept="image/png, image/jpeg, image/gif"
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CashierDashboard;