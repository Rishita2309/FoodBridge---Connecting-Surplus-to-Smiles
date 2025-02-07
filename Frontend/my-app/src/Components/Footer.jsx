import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer bg-light">
      <div className="container py-5">
        <div className="row">
          {/* Section 1: Map */}
          <div className="col-md-4 mb-4">
            <h3>Our Location</h3>
            <div className="map-placeholder">
              {/* Add your map here */}
              <p>Map placeholder</p>
            </div>
          </div>

          {/* Section 2: Address and Phone Number */}
          <div className="col-md-4 mb-4">
            <h3>Contact Us</h3>
            <p>1234 Some Street, City, Country</p>
            <p>Phone: +123 456 7890</p>
          </div>

          {/* Section 3: List of Pages */}
          <div className="col-md-4 mb-4">
            <h3>Quick Links</h3>
            <ul className="footer-links list-unstyled">
              <li><a href="/home">Home</a></li>
              <li><a href="/impact">Impact</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
