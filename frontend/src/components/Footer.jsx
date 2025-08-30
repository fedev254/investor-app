import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">

          {/* Column 1: Company Info */}
          <div className="col-12 col-md-4 mb-4">
            <h5 className={styles.footerTitle}>Infinity FinTech</h5>
            <p className={styles.footerText}>
              Providing seamless financial tracking and management solutions for modern investors.
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="col-6 col-md-2 mb-4">
            <h5 className={styles.footerTitle}>Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/dashboard" className={styles.footerLink}>Dashboard</Link></li>
              <li><Link to="/terms" className={styles.footerLink}>Terms</Link></li>
              <li><Link to="/privacy" className={styles.footerLink}>Privacy</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="col-12 col-md-6 mb-4">
            <h5 className={styles.footerTitle}>Customer Care</h5>
            <ul className="list-unstyled">
              <li className={styles.footerText}><i className="fas fa-home me-2"></i>InFinTech</li>
              <li className={styles.footerText}>
                <i className="fas fa-envelope me-2"></i>
                <a href="mailto:pmutinda923@gmail.com" className={styles.footerLink}>
                  pmutinda923@gmail.com
                </a>
              </li>
              <li className={styles.footerText}>
                <i className="fas fa-phone me-2"></i>
                <a href="tel:+254731463458" className={styles.footerLink}>
                  +254 731 463 458
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p>© {currentYear} Infinity FinTech. All rights reserved.</p>
          <div>
            <a href="https://www.facebook.com/InFinTechMakers" className={styles.socialIcon}><i className="fab fa-facebook-f"></i></a>
            <a href="https://x.com/De_Bugger808?t=q9cicgntXHiGD0ABv1b9aw&s=09" className={styles.socialIcon}><i className="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com/in/benard-mumo-b9a00827a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className={styles.socialIcon}><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
