import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Use navigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));

       
        navigate('/request'); 
      } else {
        setError('Invalid email or password.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box p-4 shadow-lg rounded">
        <h2 className="text-center">Login</h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-submit w-100" disabled={isSubmitting}>
            {isSubmitting ? 'Logging In...' : 'Submit'}
          </button>
        </form>
        <p className="register-link text-center mt-3">
          Not a member? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
