const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.use(express.json()); // Add this line to parse JSON in the request body

// Define an API endpoint to make external API calls to MoMo
app.post('/api/momo-topup', async (req, res) => {
  console.log('Request received from client:', req.body);

  try {
    // Set your MoMo API URL and headers
    const momoApiUrl = 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay';
    const momoHeaders = {
      Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjI3ZDdiZTUzLTYxMjItNDliOC1hODU2LTNjYWY4NWU1MmZiNiIsImV4cGlyZXMiOiIyMDIzLTA4LTA4VDE5OjEyOjA4LjcyOCIsInNlc3Npb25JZCI6ImM3NDk5YmUyLTJlNDItNDE1My1hMTg4LTg1MWU0ZDUxYjQwNCJ9.FSEC7G6wBgaS2Bp630Oj-QBmF9rJX3ePJr0PtZbzgpdIJdILY4gsqlLr9SNUfwy5YcfNxz6KangVo35HG_lNYkhYLGBrQ-X6UGLkIhwdqJRWc7Cio-bXEDq-QjMo5cN2Y9ZZLpHaMjfWgrwNWttItidWbSMqiOV0s8K-LQ3gzPOw0KvJjCc_aeOdf6BcvxGSdEzLhgm-WqWZ72w3JUq-G9AazB2TMWrft8UTbnOeygB3RfPyswXguZ5F-hqCY9AN9_myUFdb6aXGn0z9vfR3Qzu8ZTdYpUhetN5__Vm0Xh9rftjAVV5fyEV49X0UTdyNb1DnP4wvok1_Iss1pOHGhA'}`,
      'X-Reference-Id': req.headers['x-reference-id'], // Use the generated UUID as X-Reference-Id
      'X-Target-Environment': 'sandbox',
      'Ocp-Apim-Subscription-Key': '7083bbb08a9441f1a666bada4679875a',
      'Content-Type': 'application/json',
    };

    const { amount, phoneNumber } = req.body; // Get the amount and phoneNumber from the request body

    // Create a request payload for MoMo API
    const payload = {
      amount: amount.toString(), // Convert amount to string if needed
      currency: 'EUR',
      externalId: req.headers['x-reference-id'], // Use the generated UUID as externalId
      payer: {
        partyIdType: 'MSISDN',
        partyId: phoneNumber.toString(), // Convert phoneNumber to string
      },
      payerMessage: 'Pay for stablecoin mint',
      payeeNote: 'Payment note',
    };

    // Make a POST request to MoMo API
    const response = await axios.post(momoApiUrl, payload, { headers: momoHeaders });

    // Console log the entire response
    console.log('MoMo API Response:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Error making MoMo API call:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});



// Define an API endpoint to make external API calls to MoMo for KYC
app.post('/api/kyc', async (req, res) => {
    console.log('KYC Request received from client:', req.body);
  

    const { phoneNumber } = req.body; // Get the phoneNumber from the request body

    try {
      // Set your MoMo KYC API URL and headers
      const momoKycApiUrl = `https://sandbox.momodeveloper.mtn.com/collection/v1_0/accountholder/msisdn/${phoneNumber}/basicuserinfo`;
      const momoKycHeaders = {
        Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjI3ZDdiZTUzLTYxMjItNDliOC1hODU2LTNjYWY4NWU1MmZiNiIsImV4cGlyZXMiOiIyMDIzLTA4LTA4VDE5OjEyOjA4LjcyOCIsInNlc3Npb25JZCI6ImM3NDk5YmUyLTJlNDItNDE1My1hMTg4LTg1MWU0ZDUxYjQwNCJ9.FSEC7G6wBgaS2Bp630Oj-QBmF9rJX3ePJr0PtZbzgpdIJdILY4gsqlLr9SNUfwy5YcfNxz6KangVo35HG_lNYkhYLGBrQ-X6UGLkIhwdqJRWc7Cio-bXEDq-QjMo5cN2Y9ZZLpHaMjfWgrwNWttItidWbSMqiOV0s8K-LQ3gzPOw0KvJjCc_aeOdf6BcvxGSdEzLhgm-WqWZ72w3JUq-G9AazB2TMWrft8UTbnOeygB3RfPyswXguZ5F-hqCY9AN9_myUFdb6aXGn0z9vfR3Qzu8ZTdYpUhetN5__Vm0Xh9rftjAVV5fyEV49X0UTdyNb1DnP4wvok1_Iss1pOHGhA'}`,
        'Ocp-Apim-Subscription-Key': '7083bbb08a9441f1a666bada4679875a',
        'X-Target-Environment': 'sandbox',
        'Content-Type': 'application/json',
      };
  
      
  
      // Make a GET request to MoMo KYC API
      const response = await axios.get(momoKycApiUrl, {
        headers: momoKycHeaders,
        params: {
          msisdn: phoneNumber.toString(),
        },
      });
  
      // Console log the entire KYC response
      console.log('MoMo KYC API Response:', response.data);
  
      res.json(response.data);
    } catch (error) {
      console.error('Error making MoMo KYC API call:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  const PORT = 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });