// in frontend/src/components/Footer.jsx

import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom'; // Use Link for internal navigation

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // This full-width outer div controls the background color.
    <div className="bg-dark text-white mt-auto">
        
      {/* The standard "container" class keeps content aligned and centered. */}
      <footer className="container py-5">
        <div className="row">

          {/* Column 1: Company Info */}
          <div className="col-12 col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold text-warning">Infinity FinTech</h5>
            <p className={styles.footerText}>
              Providing seamless financial tracking and management solutions for modern investors.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-6 col-md-2 mb-4">
            <h5 className="text-uppercase fw-bold text-warning">Links</h5>
            <ul className="list-unstyled">
              {/* Using <Link> for internal app navigation is better than <a> */}
              <li><Link to="/dashboard" className={`text-white text-decoration-none ${styles.footerLink}`}>Dashboard</Link></li>
              <li><Link to="/terms" className={`text-white text-decoration-none ${styles.footerLink}`}>Terms</Link></li>
              <li><Link to="/privacy" className={`text-white text-decoration-none ${styles.footerLink}`}>Privacy</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Customer Care */}
          <div className="col-12 col-md-6 mb-4">
            <h5 className="text-uppercase fw-bold text-warning">Customer Care</h5>
            <ul className="list-unstyled">
              <li className={styles.footerText}><i className="fas fa-home me-2"></i> InnovTech Company Limited</li>
              
              {/* --- CLICKABLE EMAIL --- */}
              <li className={styles.footerText}>
                <i className="fas fa-envelope me-2"></i>
                <a href="mailto:support@infinityfintech.com" className="text-white text-decoration-none">
                  support@infinityfintech.com
                </a>
              </li>

              {/* --- CLICKABLE PHONE NUMBER --- */}
              <li className={styles.footerText}>
                <i className="fas fa-phone me-2"></i>
                <a href="tel:+254740352684" className="text-white text-decoration-none">
                  +254740352684
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div className="d-flex flex-column flex-sm-row justify-content-between pt-4">
          <p className={styles.footerText}>© {currentYear} Infinity FinTech. All rights reserved.</p>
          
          {/* Social Media Icons */}
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a href="#" className={`text-white ${styles.socialIcon}`}><i className="fab fa-facebook-f"></i></a>
            </li>
            <li className="ms-3">
              <a href="#" className={`text-white ${styles.socialIcon}`}><i className="fab fa-twitter"></i></a>
            </li>
            <li className="ms-3">
              <a href="#" className={`text-white ${styles.socialIcon}`}><i className="fab fa-linkedin-in"></i></a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;