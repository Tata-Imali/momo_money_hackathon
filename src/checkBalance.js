import React, { useState } from 'react';
import logo from './Tata-iMali-logo-colour-transparent.png'
import { Client, AccountId, PrivateKey, AccountBalanceQuery, TokenInfoQuery } from "@hashgraph/sdk";
import './checkBalance.css'

function TokenBalancesView() {
  const [tokenBalances, setTokenBalances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckBalance = async () => {
    setIsLoading(true);

    try {
      // Create a new Hedera client
      const client = Client.forTestnet();

      // Set your account ID and private key
      const myAccountId = AccountId.fromString("0.0.15408203");
      const myPrivateKey = PrivateKey.fromString("0x81d3fa5c13d3620295a583e202e042d61093f325e12f58c4b768c25703cdd677");

      // Connect to the Hedera network
      await client.setOperator(myAccountId, myPrivateKey);

      // Retrieve token balances
      const balanceQuery = new AccountBalanceQuery()
        .setAccountId(myAccountId)
        .execute(client);

      const balances = await balanceQuery;

      const tokenBalancesWithNames = [];

      for (const [tokenId, balance] of balances.tokens) {
        const tokenInfoQuery = new TokenInfoQuery()
          .setTokenId(tokenId)
          .execute(client);

        const tokenInfo = await tokenInfoQuery;

        const tokenBalanceWithName = {
          tokenName: tokenInfo.name,
          tokenId,
          balance
        };

        tokenBalancesWithNames.push(tokenBalanceWithName);
      }

      setTokenBalances(tokenBalancesWithNames);
    } catch (error) {
      console.error("Error retrieving token balances:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="token-balances-view-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="token-balances-view">
        <h2 style={{ color: 'white' }}>Token Balances:</h2>
        <button onClick={handleCheckBalance}>Check Balance</button>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {tokenBalances.map((tokenBalance) => (
              <li key={tokenBalance.tokenId}>
                <p>Token Name: {tokenBalance.tokenName.toString()}</p>
                <p>Token ID: {tokenBalance.tokenId.toString()}</p>
                <p>Balance: {(tokenBalance.balance / 100).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
  
  
}

export default TokenBalancesView;
