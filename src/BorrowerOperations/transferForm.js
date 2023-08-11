import React, { useState } from 'react';
import { Client, TransferTransaction, TokenId } from "@hashgraph/sdk";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './transferForm.css';
import logo from '../Branding/Tata-iMali-logo-colour-transparent.png'

function TransferForm() {
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
    
  }

  const handleTransfer = async () => {
    try {
      const tokenId = new TokenId(0, 0, 450186); // Replace with the actual token ID 0.0.447471
      
      const senderAccountId = '0.0.447190'; // Replace with the sender's account ID
      const senderPrivateKey = '0x81d3fa5c13d3620295a583e202e042d61093f325e12f58c4b768c25703cdd677';
      const recipientId = '0.0.450078'; // Fixed recipient account ID
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
        <img src={logo} alt="Logo" id="logoRepay" />
      </div> 
        <h2>Repayments</h2>
        <p className="info-text">Repay outstanding debt below</p>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button type="submit" onClick={handleTransfer}>Repay Now</button>
        </form>
      </div>
    </div>
  );
}

export default TransferForm;
