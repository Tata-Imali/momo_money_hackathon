import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../Branding/Tata-iMali-logo-colour-transparent.png'; // Make sure to provide the correct path

import './login.css'; // Import your shared styling

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic here
    // You can use 'phoneNumber' and 'password' for authentication
  };

  return (
    <div>
      <div className="container">
        <ToastContainer />
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <h2>Login</h2>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
