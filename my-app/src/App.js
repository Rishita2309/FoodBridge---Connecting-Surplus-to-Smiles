import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AboutUs from './Pages/AboutUs';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Donate from './Pages/Donate';
import Request from './Pages/Request';
import './index.css';  // Make sure this is correctly imported

function App() {
  return (
    <Router>
      {/* Navbar should appear on all pages */}
      <Navbar />
      
      {/* Define routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/request" element={<Request />} />
      </Routes>

      {/* Footer should appear on all pages */}
      <Footer />
    </Router>
  );
}

export default App;
