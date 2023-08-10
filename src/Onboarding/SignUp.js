import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../Firebase/config';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../Branding/Tata-iMali-logo-colour-transparent.png';

import './SignUp.css';

const SignupPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleSignup = async () => {
    

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(`${phoneNumber}@yourappdomain.com`, password);

      toast.success('Sign up successful!');
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Error signing up. Please try again.');
    }
  };

  return (
    <div>
      <div className="container">
        <ToastContainer />
        <form className="auth-form" onSubmit={handleSignup}>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-signup" />
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
            {password.length > 0 && password.length < 6 && (
              <div className="password-warning">Password must be at least 6 characters long</div>
            )}
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
          <p className="already-have-account">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
