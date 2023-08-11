import React, { useEffect, useState } from 'react';
import logo from '../Branding/Tata-iMali-logo-colour-transparent.png';
import { database } from '../Firebase/config'; // Import database instance
import { Client, TransferTransaction } from '@hashgraph/sdk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './checkRequests.css';

const client = Client.forTestnet();
client.setOperator('0.0.450078', '0xd8db27a1af00d3b0a93f504fc13184de26d40cc08a5fe59b87379734fb125f34');

function DisplayTokenRequests() {
  const [password, setPassword] = useState('');
  const [showTokenRequests, setShowTokenRequests] = useState(false);
  const [tokenRequests, setTokenRequests] = useState([]);

  useEffect(() => {
    const tokenRequestsRef = database.ref('token-requests');

    tokenRequestsRef
      .once('value')
      .then((snapshot) => {
        const requests = snapshot.val();
        if (requests) {
          const requestsArray = Object.entries(requests).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setTokenRequests(requestsArray);
        }
      })
      .catch((error) => {
        console.error('Error fetching token requests:', error);
      });
  }, []);

  function handlePasswordSubmit() {
    const correctPassword = '12345'; // Replace with your actual password

    if (password === correctPassword) {
      setShowTokenRequests(true);
    } else {
      toast.error('Invalid password', { autoClose: 3000 });
    }
  }

  async function acceptRequest(request) {
    try {
      // Transfer the desired amount of tokens from the sender's account to the receiver's account
      const transaction = await new TransferTransaction()
        .addTokenTransfer('0.0.450186', request.senderAccountId, -request.desiredAmount)
        .addTokenTransfer('0.0.450186', request.receiverAccountId, request.desiredAmount)
        .execute(client);

      console.log('Transaction ID:', transaction.transactionId);

      const tokenRequestsRef = database.ref('token-requests');
      await tokenRequestsRef.child(request.id).remove();

      // Show success notification
      toast.success('Token transfer accepted successfully!', { autoClose: 3000 });

      
    } catch (error) {
      console.error('Error accepting token request:', error);
    }
  }

  async function rejectRequest(request) {
    try {
      
      const tokenRequestsRef = database.ref('token-requests');
      await tokenRequestsRef.child(request.id).remove();

      // Show success notification
      toast.error('Token transfer rejected!', { autoClose: 3000 });

      
    } catch (error) {
      console.error('Error rejecting token request:', error);
    }
  }

  const filteredRequests = tokenRequests.filter(
    (request) => request.senderAccountId === '0.0.450078'
  );

  if (!showTokenRequests) {
    return (
      <div className="password-protect-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="password-logo" />
        </div>
        <div className="password-form">
          <h2>Enter Password </h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
          />
          <button onClick={handlePasswordSubmit} className="password-button">
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="token-requests-view-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="token-logo" />
      </div>
      <h3 className="token-requests-heading">Loan requests</h3>
      <table className="token-request-table">
        <tbody>
          {filteredRequests.map((request) => (
            <React.Fragment key={request.id}>
              <tr>
                <td className="table-cell">Request account:</td>
                <td className="table-cell left">{request.receiverAccountId}</td>
              </tr>
              <tr>
                <td className="table-cell">Amount:</td>
                <td className="table-cell left">
                  <span className="desired-amount">{(request.desiredAmount * 0.01).toFixed(2)}</span>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        {filteredRequests.map((request) => (
          <div key={request.id}>
            <button onClick={() => acceptRequest(request)} className="accept-button">
              Accept
            </button>
            <button onClick={() => rejectRequest(request)} className="reject-button">
              Reject
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );




}

export default DisplayTokenRequests;
