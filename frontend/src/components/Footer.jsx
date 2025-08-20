// in frontend/src/components/Footer.jsx

import React from 'react';
// We'll use CSS modules for simple, scoped styling.
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-dark text-white pt-5 pb-4 ${styles.footerContainer}`}>
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left">

          {/* Column 1: Company Info */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Infinity FinTech</h5>
            <p>
              Providing seamless financial tracking and management solutions for modern investors.
              Empowering your business decisions with real-time data and insights.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Links</h5>
            <p><a href="#" className="text-white" style={{ textDecoration: 'none' }}> Investor Dashboard</a></p>
            <p><a href="#" className="text-white" style={{ textDecoration: 'none' }}> Cashier Portal</a></p>
            <p><a href="#" className="text-white" style={{ textDecoration: 'none' }}> Terms of Service</a></p>
            <p><a href="#" className="text-white" style={{ textDecoration: 'none' }}> Privacy Policy</a></p>
          </div>

          {/* Column 3: Contact & Customer Care */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
            <p><i className="fas fa-home mr-3"></i> 123 Finance Street, New York, NY 10001</p>
            <p><i className="fas fa-envelope mr-3"></i> support@infinityfintech.com</p>
            <p><i className="fas fa-phone mr-3"></i> Customer Care: +1 (800) 123-4567</p>
            <p><i className="fas fa-print mr-3"></i> Support Hours: Mon-Fri, 9am-5pm EST</p>
          </div>
        </div>

        <hr className="mb-4" />

        <div className="row align-items-center">
          {/* Copyright Section */}
          <div className="col-md-7 col-lg-8">
            <p>
              Copyright ©{currentYear} All rights reserved by: 
              <a href="#" style={{ textDecoration: 'none' }}>
                <strong className="text-warning"> Infinity FinTech</strong>
              </a>
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a href="#" className={`btn-floating btn-sm text-white ${styles.socialIcon}`}><i className="fab fa-facebook-f"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className={`btn-floating btn-sm text-white ${styles.socialIcon}`}><i className="fab fa-twitter"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className={`btn-floating btn-sm text-white ${styles.socialIcon}`}><i className="fab fa-linkedin-in"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className={`btn-floating btn-sm text-white ${styles.socialIcon}`}><i className="fab fa-youtube"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;