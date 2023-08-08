import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import TransferForm from "./transferForm";
import TokenBalancesView from "./checkBalance";
import TokenRequestView from "./tokenRequest";
import DisplayTokenRequests from "./checkRequests";
import TopUp from "./TopUp";
import KYC from "./kyc.js"; // Import the KYC component
import "./App.css";
import logoH from './hedera-logo.png';

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
