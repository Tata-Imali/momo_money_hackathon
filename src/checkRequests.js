import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { Client, TransferTransaction } from '@hashgraph/sdk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './checkRequests.css';

const firebaseConfig = {
  apiKey: "AIzaSyBJnj-Z9a29PANZzNVHOlMSebapEfYvUpo",
  authDomain: "imali-project-efa64.firebaseapp.com",
  databaseURL: "https://imali-project-efa64-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "imali-project-efa64",
  storageBucket: "imali-project-efa64.appspot.com",
  messagingSenderId: "751418679453",
  appId: "1:751418679453:web:9f45723cd7d4e031823474"
};

const client = Client.forTestnet();
client.setOperator('0.0.15389470', '0x4d14563bb438621d9aa5366b0fd851c7008bcda156fa9c2a0b7f6ffc6229baeb');

function DisplayTokenRequests() {
  const [tokenRequests, setTokenRequests] = useState([]);

  useEffect(() => {
    const database = firebase.database();
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

  async function acceptRequest(request) {
    try {
      // Transfer the desired amount of tokens from the sender's account to the receiver's account
      const transaction = await new TransferTransaction()
        .addTokenTransfer('0.0.15408199', request.senderAccountId, -request.desiredAmount)
        .addTokenTransfer('0.0.15408199', request.receiverAccountId, request.desiredAmount)
        .execute(client);

      console.log('Transaction ID:', transaction.transactionId);

      const database = firebase.database();
      const tokenRequestsRef = database.ref('token-requests');
      await tokenRequestsRef.child(request.id).remove();

      // Show success notification
      toast.success('Token transfer accepted successfully!', { autoClose: 3000 });

      // Reload the page after the notification disappears
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Error accepting token request:', error);
    }
  }

  async function rejectRequest(request) {
    try {
      const database = firebase.database();
      const tokenRequestsRef = database.ref('token-requests');
      await tokenRequestsRef.child(request.id).remove();

      // Show success notification
      toast.error('Token transfer rejected!', { autoClose: 3000 });

      // Reload the page after the notification disappears
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Error rejecting token request:', error);
    }
  }

  const filteredRequests = tokenRequests.filter(
    (request) => request.senderAccountId === '0.0.15389470'
  );

  if (filteredRequests.length === 0) {
    return <p>No token requests found for your account.</p>;
  }

  return (
    <div className="token-requests-view-container">
      <h3>Token Requests for Your Account</h3>
      <ul className="token-requests-list">
        {filteredRequests.map((request) => (
          <li key={request.id} className="list">
            <p>Request from: {request.receiverAccountId}</p>
            <p>Desired Amount: {(request.desiredAmount * 0.01).toFixed(2)}</p>
            <div className="button-container">
              <button onClick={() => acceptRequest(request)} className="accept-button">
                Accept
              </button>
              <button onClick={() => rejectRequest(request)} className="reject-button">
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer /> {/* ToastContainer component from react-toastify */}
    </div>
  );
}

export default DisplayTokenRequests;
