import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="container py-5">
        <div className="row">
          {/* Section 1: Map */}
          <div className="col-md-4 mb-4">
            <h3>Our Location</h3>
            <div className="map-placeholder">
              {/* Embedded Google Map */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1891.1513453186988!2d73.90977308826689!3d18.560387488341878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c13f120b95d9%3A0xbfdde2f42e221a78!2sWEIKFIELD%20IT%20CITI%20INFO%20PARK%2C%20Sakore%20Nagar%2C%20Viman%20Nagar%2C%20Pune%2C%20Maharashtra%20411014!5e0!3m2!1sen!2sin!4v1739004454904!5m2!1sen!2sin" 
                width="600" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Section 2: Address and Phone Number */}
          <div className="col-md-4 mb-4">
            <h3>Contact Us</h3>
            <p className='address'>Weikfield IT Park, <br/> Pune Nagar Road, <br/>Pune, India</p>
            <p className='phone'>Phone: +91 947537 63283</p>
          </div>

          {/* Section 3: List of Pages */}
          <div className="col-md-4 mb-4">
            <h3>Quick Links</h3>
            <ol className="footer-links list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/donate">Donate</a></li>
              <li><a href="/request">Donations</a></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
