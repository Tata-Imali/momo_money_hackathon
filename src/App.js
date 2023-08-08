import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import TransferForm from "./transferForm";
import TokenBalancesView from "./checkBalance";
import TokenRequestView from "./tokenRequest";
import DisplayTokenRequests from "./checkRequests";
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/transfer" className="nav-link">
                Transfer Form
              </Link>
            </li>
            <li>
              <Link to="/balance" className="nav-link">
                Balance Check
              </Link>
            </li>
            <li>
              <Link to="/request" className="nav-link">
                Make Request 
              </Link>
            </li>
            <li>
              <Link to="/display" className="nav-link">
                My Requests
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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
