import React, { useState } from 'react';
import logo from './Tata-iMali-logo-colour-transparent.png';
import { Client, AccountId, PrivateKey, AccountBalanceQuery, TokenInfoQuery } from "@hashgraph/sdk";
import './checkBalance.css';

function TokenBalancesView() {
  const [tokenBalance, setTokenBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckBalance = async () => {
    setIsLoading(true);

    try {
      // Create a new Hedera client
      const client = Client.forTestnet();

      // Set your account ID and private key
      const myAccountId = AccountId.fromString("0.0.447190");
      const myPrivateKey = PrivateKey.fromString("0x81d3fa5c13d3620295a583e202e042d61093f325e12f58c4b768c25703cdd677");

      // Connect to the Hedera network
      await client.setOperator(myAccountId, myPrivateKey);

      // Replace with the specific token ID you want to check
      const specificTokenId = "0.0.450186";

      // Retrieve token balance for the specific token
      const balanceQuery = new AccountBalanceQuery()
        .setAccountId(myAccountId)
        .execute(client);

      const balances = await balanceQuery;

      const specificTokenBalance = balances.tokens.get(specificTokenId);

      if (specificTokenBalance !== undefined) {
        const tokenInfoQuery = new TokenInfoQuery()
          .setTokenId(specificTokenId)
          .execute(client);

        const tokenInfo = await tokenInfoQuery;

        const tokenBalanceWithName = {
          tokenName: tokenInfo.name,
          tokenId: specificTokenId,
          balance: specificTokenBalance
        };

        setTokenBalance(tokenBalanceWithName); // Store the balance of the specific token
      } else {
        setTokenBalance(null); // Clear the token balance if the specific token isn't found
      }
    } catch (error) {
      console.error("Error retrieving token balance:", error);
    }

    setIsLoading(false);
  };

  const TokenInfoTable = () => (
    <table
      style={{
        color: '#FFFFFF',
        margin: '0 auto',
        borderCollapse: 'collapse',
        border: 'px solid black',
        backgroundColor: '#363636',
        width: '50%', // Adjust the width as needed
      }}
    >
      <tbody>
        <tr>
          <td style={{ padding: '8px', border: '1px solid black', fontSize: '12px' }}>Token Name:</td>
          <td style={{ padding: '8px', border: '1px solid black', fontSize: '12px', color: '#D5FF0A' }}>{tokenBalance.tokenName.toString()}</td>
        </tr>
        <tr>
          <td style={{ padding: '8px', border: '1px solid black', fontSize: '12px' }}>Token ID:</td>
          <td style={{ padding: '8px', border: '1px solid black', fontSize: '10px' }}>{tokenBalance.tokenId.toString()}</td>
        </tr>
        <tr>
          <td style={{ padding: '8px', border: '1px solid black', fontSize: '12px' }}>Balance:</td>
          <td style={{ padding: '8px', border: '1px solid black', fontSize: '16px', color: '#6BFE53' }}>{(tokenBalance.balance / 100).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className="token-balances-view-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      
      <div className="token-balances-view">
        <h2 style={{ fontSize: '16px', color: '#FFFFFF' }}>Available Balance:</h2>
        <button onClick={handleCheckBalance}>Check Balance</button>
        {isLoading ? (
          <p style={{ fontSize: '16px', color: '#FFFFFF' }}>Loading...</p>
        ) : (
          <div style={{ textAlign: 'center' }}>
            {tokenBalance ? <TokenInfoTable /> : <p style={{ fontSize: '12px', color: '#FFFFFF' }}></p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default TokenBalancesView;



