import React, { useState } from 'react';
import { Client, AccountId, PrivateKey, TokenAssociateTransaction, TokenWipeTransaction } from '@hashgraph/sdk';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './tokenRequest.css';
import logo from './Tata-iMali-logo-colour-transparent.png';

// Initialize Firebase with your project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJnj-Z9a29PANZzNVHOlMSebapEfYvUpo",
  authDomain: "imali-project-efa64.firebaseapp.com",
  databaseURL: "https://imali-project-efa64-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "imali-project-efa64",
  storageBucket: "imali-project-efa64.appspot.com",
  messagingSenderId: "751418679453",
  appId: "1:751418679453:web:9f45723cd7d4e031823474"
};

firebase.initializeApp(firebaseConfig);

function TokenRequestView() {
  const senderPrivateId = '0x4d14563bb438621d9aa5366b0fd851c7008bcda156fa9c2a0b7f6ffc6229baeb';
  const senderAccountId = '0.0.15389470';
  const [desiredAmount, setDesiredAmount] = useState('');
  const [interestRate, setInterestRate] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [requestDate, setRequestDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleTokenRequest = async () => {
    try {
      // Your account ID and private key
      const senderPrivateKey = PrivateKey.fromString(senderPrivateId);

      // Receiver's account ID
      const receiverAccountId = AccountId.fromString('0.0.15408203');
      const amount = parseInt(desiredAmount, 10);

      // Create a new Hedera client
      const client = Client.forTestnet(); // Use `Client.forMainnet()` for mainnet

      // Connect to the Hedera network
      await client.setOperator(senderAccountId, senderPrivateKey);

      // Associate the token with the receiver's account
      await new TokenAssociateTransaction()
        .setAccountId(receiverAccountId)
        .setTokenIds(['0.0.15408199'])
        .execute(client);

      // Wipe the desired amount of tokens from the sender's account
      await new TokenWipeTransaction()
        .setTokenId('0.0.15408199')
        .setAccountId(senderAccountId)
        .setAmount(amount)
        .execute(client);

      console.log('Request sent successfully');

      // Store the token request in Firebase Realtime Database
      const database = firebase.database();
      const tokenRequestsRef = database.ref('token-requests');
      const requestTimestamp = new Date().toISOString().replace(/[.:]/g, '');

      const requestObject = {
        senderAccountId,
        receiverAccountId: receiverAccountId.toString(),
        desiredAmount: amount,
        requestTimestamp,
        totalAmount,
      };

      await tokenRequestsRef.child(requestTimestamp).set(requestObject);

      console.log('Token request stored in Firebase Realtime Database');

      // Display success toast
      toast.success('Tokens transferred successfully!', { autoClose: 3000 });

      // Reload the page
      setTimeout(() => {
        window.location.reload(); // Reload the page after 3 seconds
      }, 3000);
    } catch (error) {
      console.error('Error sending token request:', error);
    }
  };

 const handleCalculateInterest = () => {
    const amount = parseFloat(desiredAmount) * 0.01; // Move decimal point 2 steps to the left
    const interest = (amount * 0.2).toFixed(2); // 20% interest rate
    const currentDate = new Date();
    const requestDate = currentDate.toISOString();
    const expiryDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()).toISOString();
    const total = (amount + parseFloat(interest)).toFixed(2);

    setInterestRate(interest);
    setTotalAmount(total);
    setRequestDate(requestDate);
    setExpiryDate(expiryDate);

    toast.info(`Total Amount: ${total}`, { autoClose: 3000 });
    toast.info(`Repayment Date: ${expiryDate}`, { autoClose: 3000 });
  };

  return (
    <div className="container" style={{ color: 'white' }}>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <ToastContainer />
      <h2 style={{ fontSize: '16px', color: '#FFFFFF' }}>Token Request</h2>
      <div>
        <label className="label" >
          Sender Account ID:
          <input
            type="text"
            value={senderAccountId}
            className="input"
            disabled
          />
        </label>
      </div>
      <div>
        <label className="label">
          Desired Amount:
          <input
            type="number"
            value={desiredAmount}
            onChange={(e) => setDesiredAmount(e.target.value)}
            className="input"
          />
        </label>
      </div>
      <div>
  <button onClick={handleCalculateInterest} className="button">
    Calculate Interest
  </button>
  <table className="result-table">
    <tbody>
      <tr>
        <td><p style={{ fontSize: '12px', color: '#FFFFFF' }}>Desired Amount:</p></td>
        <td><p style={{ color: '#6BFE53' }}>{(desiredAmount * 0.01).toFixed(2)}</p></td>
      </tr>
      <tr>
        <td><p style={{ fontSize: '12px', color: '#FFFFFF' }}>Interest Amount:</p></td>
        <td><p style = {{ color: '#D5FF0A'}}>{interestRate}</p></td>
      </tr>
      <tr>
        <td><p style={{ fontSize: '12px', color: '#FFFFFF' }}>Repayment Amount:</p></td>
        <td><p style={{ color: '#FE7253' }}>{totalAmount}</p></td>
      </tr>
      <tr>
        <td><p style={{ fontSize: '12px', color: '#FFFFFF' }}>Repayment Date:</p></td>
        <td><p>{new Date(expiryDate).toLocaleDateString()}</p></td>
      </tr>
    </tbody>
  </table>
  <button onClick={handleTokenRequest} className="button">
    Send Token Request
  </button>
</div>

    </div>
  );
  }  


export default TokenRequestView;
