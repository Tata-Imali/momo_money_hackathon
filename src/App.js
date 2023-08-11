import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import TransferForm from './BorrowerOperations/transferForm';
import TokenBalancesView from './BorrowerOperations/checkBalance';
import TokenRequestView from './BorrowerOperations/tokenRequest';
import DisplayTokenRequests from './AdminOperations/checkRequests';
import TopUp from './BorrowerOperations/TopUp';
import KYC from './AdminOperations/kyc';
import SignupPage from './Onboarding/SignUp';
import LoginPage from './Onboarding/login';

import './App.css';
import logoH from './Branding/hedera-logo.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  const handleLogin = (userType) => {
    setIsLoggedIn(true);
    setUserType(userType);
  };

  return (
    <Router>
      <div className="App">
        <div className="view-container">
          <Routes>
            {isLoggedIn ? (
              <>
                {userType === 'Borrower' && (
                  <>
                    <Route path="/topup" element={<TopUp />} />
                    <Route path="/tokenrequest" element={<TokenRequestView />} />
                    <Route path="/transfer" element={<TransferForm />} />
                    <Route path="/checkbalance" element={<TokenBalancesView />} />
                  </>
                )}
                {userType === 'Admin' && (
                  <>
                    <Route path="/kyc" element={<KYC />} />
                    <Route path="/checkrequests" element={<DisplayTokenRequests />} />
                  </>
                )}
              </>
            ) : (
              <>
                <Route path="/signup" element={<SignupPage />} />
                <Route
                  path="/login"
                  element={<LoginPage onLogin={handleLogin} setUserType={setUserType} />}
                />
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
              {userType === 'Borrower' && (
                <>
                  <li>
                    <Link to="/topup" className="nav-link">
                      Top Up
                    </Link>
                  </li>
                  <li>
                    <Link to="/tokenrequest" className="nav-link">
                      Request Loan
                    </Link>
                  </li>
                  <li>
                    <Link to="/transfer" className="nav-link">
                      Repayments
                    </Link>
                  </li>
                  <li>
                    <Link to="/checkbalance" className="nav-link">
                      Check Balance
                    </Link>
                  </li>
                </>
              )}
              {userType === 'Admin' && (
                <>
                  <li>
                    <Link to="/kyc" className="nav-link">
                      KYC
                    </Link>
                  </li>
                  <li>
                    <Link to="/checkrequests" className="nav-link">
                      Check Requests
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </Router>
  );
}

export default App;
