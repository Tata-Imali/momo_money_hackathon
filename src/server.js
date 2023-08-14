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
      Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImNmNzRhNjY1LTRhZDEtNDg0Ni1hNWFmLTQzNDVkOTYzMzFjMyIsImV4cGlyZXMiOiIyMDIzLTA4LTE0VDEzOjMxOjMwLjIwNiIsInNlc3Npb25JZCI6ImVhOWNhZGY0LWIzYTQtNDQ2OS1hOGMwLTRkNThmYTY2MGMyNSJ9.U932DrtdZhg0RKI-0Ajrn7YO3e0e3XIV1zi8xXjgDeWkQwgVLBT5oRmg81Y7xooVb9lu6OmFLAHzjVrc1DKs0hM55ysuWtfdWNdoGwncYyvHTgFaN2YzGF9yHBExsmbDYqM_gl_ygh93B-wXRlzDjQSr6MIfe_EnQ8rn-YwErZpMiGBI2REvSurFDm3iO56UOAO44gOacY8NRS9RZe9-UEZ-YIkZTzoxyHyB0KagCSmjrjbB9yBZxmuf4xYKImQGGKMIeAdHznkQBjKruZcWUZ4U7-sxgtD9TNF-ZpIUGOl7QfAeekah2IQUCL4h3Fs8KvV8ebJLntHB7WuyPf3AXw'}`, // Use the Authorization token for the Collections product
      'X-Reference-Id': req.headers['x-reference-id'], // Use the generated UUID as X-Reference-Id
      'X-Target-Environment': 'sandbox',
      'Ocp-Apim-Subscription-Key': '7083bbb08a9441f1a666bada4679875a', // Use the subscription key for the Collections product
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

// Define an API endpoint to make external API calls to MoMo
app.post('/api/momo-cashout', async (req, res) => {
  console.log('Request received from client:', req.body);

  try {
    // Set your MoMo API URL and headers
    const momoApiUrl = 'https://sandbox.momodeveloper.mtn.com/disbursement/v1_0/deposit';
    const momoHeaders = {
      Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjNjM2JkYWJjLTQ0ZDEtNGFjMi1iMDNhLTRiZTZmMDUyMGNmOSIsImV4cGlyZXMiOiIyMDIzLTA4LTE0VDEyOjM3OjAzLjQ2MyIsInNlc3Npb25JZCI6IjgwM2U0NjNkLWI0ZDEtNDA5NS1hY2MzLTg5ODBhMGY2YTEwMyJ9.AxqAvd0-XEbHteuldkuGmw5HE4AvK4ASWmMJn5159rLctElSKbdaAmywV2sOHodl6xp4tULwqRkoIHoj3TVbzjFJCIJre8zRTV0F3r9OnTVHW85x1svS7QTJWRvds97LV9DJDMGGuvi4fkDGwp_N2Azf4cPpWsm8EHWKrurIGcM_K1Igxja6-pPwjADlkg6U58U7uaJL4WPDPwoc_fFwNEPwu8g7pcvyx6WBsOhf53kdhON-TAiZpPHvM6_KmQdy2qyKf1-MKV_UHw-PGS-mVf4f-vIM6CzkuRKFPKFrMJ9BQhu-BthwtfZepAgVF_TxmmXBQdIRVDfzEephyZzRpA'}`, // Use the Authorization token for the Disbursements product
      'X-Reference-Id': req.headers['x-reference-id'], // Use the generated UUID as X-Reference-Id
      'X-Target-Environment': 'sandbox',
      'Ocp-Apim-Subscription-Key': 'c3a4d4fd75494b1a9bdcbc7f09d2dd2f', // Use the subscription key for the Disbursements product
      'Content-Type': 'application/json',
    };

    const { amount, phoneNumber } = req.body; // Get the amount and phoneNumber from the request body

    // Create a request payload for MoMo API
    const payload = {
      amount: amount.toString(), // Convert amount to string if needed
      currency: 'EUR',
      externalId: '123456',
      payee: {
        partyIdType: 'MSISDN',
        partyId: phoneNumber.toString(), // Convert phoneNumber to string
      },
      payerMessage: 'Cashoutofstablecoin',
      payeeNote: 'Paymentnote',
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
        Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImNmNzRhNjY1LTRhZDEtNDg0Ni1hNWFmLTQzNDVkOTYzMzFjMyIsImV4cGlyZXMiOiIyMDIzLTA4LTE0VDEzOjMxOjMwLjIwNiIsInNlc3Npb25JZCI6ImVhOWNhZGY0LWIzYTQtNDQ2OS1hOGMwLTRkNThmYTY2MGMyNSJ9.U932DrtdZhg0RKI-0Ajrn7YO3e0e3XIV1zi8xXjgDeWkQwgVLBT5oRmg81Y7xooVb9lu6OmFLAHzjVrc1DKs0hM55ysuWtfdWNdoGwncYyvHTgFaN2YzGF9yHBExsmbDYqM_gl_ygh93B-wXRlzDjQSr6MIfe_EnQ8rn-YwErZpMiGBI2REvSurFDm3iO56UOAO44gOacY8NRS9RZe9-UEZ-YIkZTzoxyHyB0KagCSmjrjbB9yBZxmuf4xYKImQGGKMIeAdHznkQBjKruZcWUZ4U7-sxgtD9TNF-ZpIUGOl7QfAeekah2IQUCL4h3Fs8KvV8ebJLntHB7WuyPf3AXw'}`, // Use the Authorization token for the Collections product
        'Ocp-Apim-Subscription-Key': '7083bbb08a9441f1a666bada4679875a', // Use the subscription key for the Collections product
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