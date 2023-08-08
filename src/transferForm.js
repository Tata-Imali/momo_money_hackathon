import React, { useState } from 'react';
import { Client, TransferTransaction, TokenId } from "@hashgraph/sdk";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './transferForm.css';
import logo from './Tata-iMali-logo-colour-transparent.png'

function TransferForm({}) {
  const [recipientAccountId, setRecipientAccountId] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  async function transferTokens(tokenId, senderAccountId, senderPrivateKey, recipientAccountId, amount) {
    const client = Client.forTestnet(); // or Client.forMainnet() for mainnet
    client.setOperator(senderAccountId, senderPrivateKey);
  
    const transferTransaction = await new TransferTransaction()
      .addTokenTransfer(tokenId, senderAccountId, -amount)
      .addTokenTransfer(tokenId, recipientAccountId, amount)
      .execute(client);
  
    const receipt = await transferTransaction.getReceipt(client);
    console.log("Transaction Receipt:", receipt);

    toast.success('Tokens transferred successfully!', { autoClose: 3000 }); // Display success message
    setTimeout(() => {
      window.location.reload(); // Reload the page after 3 seconds
    }, 3000);
  }

  const handleTransfer = async () => {
    try {
      const tokenId = new TokenId(0, 0, 15408199); // Replace with the actual token ID
      const senderAccountId = '0.0.15408203'; // Replace with the sender's account ID
      const senderPrivateKey = '0x81d3fa5c13d3620295a583e202e042d61093f325e12f58c4b768c25703cdd677';
      const recipientId = recipientAccountId; // Use the recipient account ID from the state
      const transferAmount = amount; // Use the transfer amount from the state

      await transferTokens(tokenId, senderAccountId, senderPrivateKey, recipientId, transferAmount);
    } catch (error) {
      console.error("Token transfer failed:", error); // Optional error message
    }
  };

  return (
    <div>
      
      <div className="container">
        <ToastContainer /> {/* Add the ToastContainer component */}
        <form className="transfer-form" onSubmit={handleSubmit}>
        <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div> 
        <h2>Transfer Tokens:</h2>
          <div>
            <label htmlFor="recipientAccountId">Recipient Account ID:</label>
            <input
              type="text"
              id="recipientAccountId"
              value={recipientAccountId}
              onChange={(e) => setRecipientAccountId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button type="submit" onClick={handleTransfer}>Transfer Tokens</button>
        </form>
      </div>
    </div>
  );
}

export default TransferForm;
