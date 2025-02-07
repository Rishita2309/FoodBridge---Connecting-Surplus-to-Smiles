import React, { useState } from 'react';
import './Register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('volunteer'); // Default is 'volunteer'
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!name || !phone || !email || !password || !role) {
      setError('Please fill all the fields.');
      return;
    }

    setIsSubmitting(true);

    // Prepare the user data for submission
    const userData = {
      name,
      phone,
      email,
      password,
      role: role.toUpperCase(), // 'volunteer' or 'donor'
    };
    console.log("User Data:", userData); // Add this line to check what is being sent

    try {
      const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const responseText = await response.text(); // Capture response body for better debugging
      console.log("Response from backend:", responseText); // Optional for debugging

      if (response.ok) {
        // Registration successful
        alert('Registration successful');
        window.location.href = '/login'; // Redirect to login page
      } else if (response.status === 409) {
        // Email already exists
        setError('Email is already registered. Please use a different one.');
      } else {
        // Generic error message
        setError(responseText || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.log(error); // Optional for debugging
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box p-4 shadow-lg rounded">
        <h2 className="text-center">Register</h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="input-container mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Phone Field */}
          <div className="input-container mb-3">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div className="input-container mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="input-container mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Role Selection (Volunteer/Donor) */}
          <div className="input-container mb-3">
            <label>Register as:</label>
            <div className="d-flex justify-content-start">
              <div className="form-check">
                <input
                  type="radio"
                  id="volunteer"
                  name="role"
                  value="volunteer"
                  checked={role === 'volunteer'}
                  onChange={handleRoleChange}
                  className="form-check-input"
                />
                <label htmlFor="volunteer" className="form-check-label">Volunteer</label>
              </div>
              <div className="form-check ml-4">
                <input
                  type="radio"
                  id="donor"
                  name="role"
                  value="donor"
                  checked={role === 'donor'}
                  onChange={handleRoleChange}
                  className="form-check-input"
                />
                <label htmlFor="donor" className="form-check-label">Donor</label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-submit w-100" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}