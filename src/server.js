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
      Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImI3YWZlYTMxLTY4N2YtNGFkNC1iNjBmLTYxYTcwY2ZlNTU3NyIsImV4cGlyZXMiOiIyMDIzLTA4LTEyVDE0OjU0OjA5LjYxMSIsInNlc3Npb25JZCI6ImYzNDgxZGZhLTQyMzUtNDdmZS05MjRjLTk1NTQ2MWI5ODgyYiJ9.W6tsGh896Oed_151fuTTQvH5xMaftioaqdjfhnzWF16o7-ERD0RTskumcEPZuCwXUb3Dx6GW0wdDdPjOtB0NtRtzi1e4dh2htE4pXMMr0fybpX_jKrcAWWMo7qZ6WM1f15ESFXWqgwzoqiJdpmOXeYChsYUWdR6VTS09ocAqm6kGwZ5gf4ekvYAl5IKhk5GjEGJiBDZYD6ObioXnqgqgaJ00B-uxIauxl43RI3CqI_xmajTC4KXgRhXF3luC2pFskeKpCrsJTKnts5xaMGC-1TaXHgCj5tG-hY8c1t9KkjmqYXYfMxxsWVDzQnsDQZE_Ft7pU8plrqnmnzkPWo-sIg'}`,
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
        Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImI3YWZlYTMxLTY4N2YtNGFkNC1iNjBmLTYxYTcwY2ZlNTU3NyIsImV4cGlyZXMiOiIyMDIzLTA4LTEyVDE0OjU0OjA5LjYxMSIsInNlc3Npb25JZCI6ImYzNDgxZGZhLTQyMzUtNDdmZS05MjRjLTk1NTQ2MWI5ODgyYiJ9.W6tsGh896Oed_151fuTTQvH5xMaftioaqdjfhnzWF16o7-ERD0RTskumcEPZuCwXUb3Dx6GW0wdDdPjOtB0NtRtzi1e4dh2htE4pXMMr0fybpX_jKrcAWWMo7qZ6WM1f15ESFXWqgwzoqiJdpmOXeYChsYUWdR6VTS09ocAqm6kGwZ5gf4ekvYAl5IKhk5GjEGJiBDZYD6ObioXnqgqgaJ00B-uxIauxl43RI3CqI_xmajTC4KXgRhXF3luC2pFskeKpCrsJTKnts5xaMGC-1TaXHgCj5tG-hY8c1t9KkjmqYXYfMxxsWVDzQnsDQZE_Ft7pU8plrqnmnzkPWo-sIg'}`,
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