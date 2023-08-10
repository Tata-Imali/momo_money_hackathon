import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import TransferForm from './BorrowerOperations/transferForm';
import TokenBalancesView from './BorrowerOperations/checkBalance';
import TokenRequestView from './BorrowerOperations/tokenRequest';
import DisplayTokenRequests from './AdminOperations/checkRequests';
import TopUp from './BorrowerOperations/TopUp';
import KYC from './AdminOperations/kyc.js';
import SignupPage from './Onboarding/SignUp.js';
import LoginPage from './Onboarding/login.js';
import { auth } from './Firebase/config';
import './App.css';
import logoH from './Branding/hedera-logo.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to be passed to the LoginPage component
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <div className="view-container">
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/transfer" element={<TransferForm />} />
                <Route path="/balance" element={<TokenBalancesView />} />
                <Route path="/request" element={<TokenRequestView />} />
                <Route path="/display" element={<DisplayTokenRequests />} />
                <Route path="/topup" element={<TopUp />} />
                <Route path="/kyc" element={<KYC />} />
              </>
            ) : (
              <>
                <Route path="/signup" element={<SignupPage />} />
                <Route
                  path="/login"
                  element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/*" element={<Navigate to="/signup" />} />
              </>
            )}
          </Routes>
        </div>
        <div className="logo-containerHm">
          <img src={logoH} alt="Logo2" className="logoHm" />
        </div>
        {isLoggedIn && (
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/transfer" className="nav-link">
                  Repayments
                </Link>
              </li>
              <li>
                <Link to="/balance" className="nav-link">
                  Accounts
                </Link>
              </li>
              <li>
                <Link to="/request" className="nav-link">
                  Request Loan
                </Link>
              </li>
              <li>
                <Link to="/display" className="nav-link">
                  My Requests
                </Link>
              </li>
              <li>
                <Link to="/topup" className="nav-link">
                  Top Up
                </Link>
              </li>
              <li>
                <Link to="/kyc" className="nav-link">
                  KYC Request
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </Router>
  );
}

export default App;
