import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../Branding/Tata-iMali-logo-colour-transparent.png'; // Make sure to provide the correct path

import './SignUp.css'; // Import your shared styling

const SignupPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(''); // Added state for user type

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your signup logic here
    // You can use 'userType', 'phoneNumber', and 'password' for registration
  };

  return (
    <div>
      <div className="container">
        <ToastContainer />
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <h2>Sign Up</h2>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
           <div>
            <label htmlFor="userType">User Type:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="">Select user type</option>
              <option value="Admin">Admin</option>
              <option value="Borrower">Borrower</option>
            </select>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
