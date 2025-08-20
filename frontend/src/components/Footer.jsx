// in frontend/src/components/Footer.jsx

import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left">

          {/* Column 1: Company Info */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">Infinity FinTech</h5>
            <p>
              Providing seamless financial tracking and management solutions for modern investors.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">Links</h5>
            <p><a href="#!" className="text-white text-decoration-none">Dashboard</a></p>
            <p><a href="#!" className="text-white text-decoration-none">Terms of Service</a></p>
            <p><a href="#!" className="text-white text-decoration-none">Privacy Policy</a></p>
          </div>

          {/* Column 3: Contact Details */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">Customer Care & Contact</h5>
            <p><i className="fas fa-home me-3"></i> 123 Finance St, New York, NY 10001</p>
            <p><i className="fas fa-envelope me-3"></i> support@infinityfintech.com</p>
            <p><i className="fas fa-phone me-3"></i> Customer Care: +1 (800) 123-4567</p>
            <p><i className="fas fa-clock me-3"></i> Support: Mon-Fri, 9am-5pm EST</p>
          </div>
        </div>

        <hr className="mb-4" />

        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-start">
              Copyright ©{currentYear} All rights reserved by: 
              <a href="#" className="text-decoration-none">
                <strong className="text-warning"> Infinity FinTech</strong>
              </a>
            </p>
          </div>

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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;