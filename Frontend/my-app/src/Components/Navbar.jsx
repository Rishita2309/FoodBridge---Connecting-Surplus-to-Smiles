import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg sticky-top navbar-large-text" style={{ backgroundColor: '#42afbf' }}>
    <div className="container-fluid">
      <Link className="navbar-brand text-black" to="/">
        <img src="/logo.png" width="40" height="36" alt="FoodBridge Logo" />
        FoodBridge
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link text-black" to="/about-us">About Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-black" to="/donate">Donate </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-black" to="/request">Donations </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-black" to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
