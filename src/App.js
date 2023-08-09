import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import TransferForm from "./BorrowerOperations/transferForm";
import TokenBalancesView from "./BorrowerOperations/checkBalance";
import TokenRequestView from "./BorrowerOperations/tokenRequest";
import DisplayTokenRequests from "./AdminOperations/checkRequests";
import TopUp from "./BorrowerOperations/TopUp";
import KYC from "./AdminOperations/kyc.js"; // Import the KYC component
import SignupPage from "./Onboarding/SignUp.js"; // Import the SignupPage component
import LoginPage from "./Onboarding/login.js"; // Import the LoginPage component
import "./App.css";
import logoH from './Branding/hedera-logo.png';

function App() {
  return (
    <Router>
      <div className="App">
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
            <li>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </nav>

        <div className="view-container">
          <Routes>
            <Route path="/transfer" element={<TransferForm />} />
            <Route path="/balance" element={<TokenBalancesView />} />
            <Route path="/request" element={<TokenRequestView />} />
            <Route path="/display" element={<DisplayTokenRequests />} />
            <Route path="/topup" element={<TopUp />} />
            <Route path="/kyc" element={<KYC />} /> {/* Add this new route for KYC */}
            <Route path="/signup" element={<SignupPage />} /> {/* Add this new route for Sign Up */}
            <Route path="/login" element={<LoginPage />} /> {/* Add this new route for Login */}
          </Routes>
        </div>
        <div className="logo-containerHm">
          <img src={logoH} alt="Logo2" className="logoHm" />
        </div>
      </div>
    </Router>
  );
}

export default App;
