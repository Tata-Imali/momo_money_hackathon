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
      Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjAyYTA2OWEwLTEzZWMtNDc5NC1hMmJiLTJiZmIzMmJkYmRjMyIsImV4cGlyZXMiOiIyMDIzLTA4LTA4VDEzOjM2OjQ4LjU0OCIsInNlc3Npb25JZCI6IjI4OTY4ODhhLWExNGQtNDQ5Yi04ZDA4LTQwMjNjNDRjOGM1ZSJ9.EnQzyvqAH-FEPgAbfKe8t2pwAPD9PaYYT--0cHZQkthMkT4TfFgYgHI7KZ0z364T2AIPRlfXk5ZV7vQ7IUvPnvgkfEdGkW-o70-esoIOtsZ-5dhXDHPvYz94xHjJXkVTrqWF7jtBWd-pVg2Gz4pGnZMS8LuPoUvy8lTKlkUYZpND5czjQIdovUnwSEJGglqmx1535KF7kA0VfgUDrAciAl8pCXmBehrwu1fWTCFYqlGbJyrJzbHXvSEID7Yw20cAAYItXGvbGK3rAUuWDihEBLXRu9iK5VUPNQ9iYjtV4nGIJJo1Uy7KMM7MYLXyO_zofPbkoEjbwC0GTX-KoR8QUg'}`,
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
        Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjEwYTM2M2QzLTgxNTEtNGVmNS05MzM4LWIyOTBjMDhjZmM0OSIsImV4cGlyZXMiOiIyMDIzLTA4LTA4VDE3OjU2OjQxLjI0OCIsInNlc3Npb25JZCI6IjEyOTM2ZjlhLTg1ZWYtNGQ0YS05MTI5LTk0N2U0NWY5ODViMyJ9.fAPPzhnIb2XnnufNbkvhA7X1iMtFaPYcISNsWRsIEugIQfjelN6Qae9vpXep4RWNpvRGkEBozjkCWBkGp2XukT5Hc52bhzVe_UreVByiugL0CIpHP-Ocs_hEn7uGdKwyXqXzBHK139JtXSpP6MiYm4WhU1Z102N-qYui22qbGX7y_FN6GTjL6ahEVM7Lm6gr7fldXNbDwFL4nCBpsRv7g5jP6JB56EQ2y4LKxsqAxeIKS9KEuLENgT2EZBx2vK6gRmtjV0AKCyGtGk--M6WOU4CnqC8-JV_cArJxaurtZzboy1dr-jorNBowmrHDBOfmfiQFnj4t3U46-HzSowXnyw'}`,
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