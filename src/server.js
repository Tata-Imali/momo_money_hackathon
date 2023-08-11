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
      Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjkwN2Y1Y2Q2LWMwZjItNGU5My1iNDA0LTBkMjI3NjE4NmQwYyIsImV4cGlyZXMiOiIyMDIzLTA4LTExVDE0OjA5OjA1LjYyMCIsInNlc3Npb25JZCI6IjAyNjJmZjllLTRjMjItNDg2Ny05ZGE0LTNkOWEzOTllNWYwNyJ9.hF4LZ_maPHL0w0hA3vUSVaOWlpqza_DXiVKI0m6hEuAFlYFqndhLoevEU0IXgLnPdfMVmJfgXE-QPGG7gzxszz-rAPVDLOMbYvOwcG1cwibF2bmDHZuq4s9s6Cn0dmbS3d2LVHB7HpEekh1JxLsNVFG5C8fNVrE9SfVkDvVQx5YiKUdVqdQO_Cg9EzeHwE60apmd728y_aZgJTEXzwDTQa4RZmKAZ2m2RdTj6lP-BedJKbiZuOTTmt6QHjSVXNENHcXb5Z6DSlytZeZtzXt2H4_cLxyRJA5xLiBlHwmIZNGHGp0e4eY3zuYsOTffEcm5QZmnOpLCuVdjVIUApaK4jQ'}`,
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
        Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjkwN2Y1Y2Q2LWMwZjItNGU5My1iNDA0LTBkMjI3NjE4NmQwYyIsImV4cGlyZXMiOiIyMDIzLTA4LTExVDE0OjA5OjA1LjYyMCIsInNlc3Npb25JZCI6IjAyNjJmZjllLTRjMjItNDg2Ny05ZGE0LTNkOWEzOTllNWYwNyJ9.hF4LZ_maPHL0w0hA3vUSVaOWlpqza_DXiVKI0m6hEuAFlYFqndhLoevEU0IXgLnPdfMVmJfgXE-QPGG7gzxszz-rAPVDLOMbYvOwcG1cwibF2bmDHZuq4s9s6Cn0dmbS3d2LVHB7HpEekh1JxLsNVFG5C8fNVrE9SfVkDvVQx5YiKUdVqdQO_Cg9EzeHwE60apmd728y_aZgJTEXzwDTQa4RZmKAZ2m2RdTj6lP-BedJKbiZuOTTmt6QHjSVXNENHcXb5Z6DSlytZeZtzXt2H4_cLxyRJA5xLiBlHwmIZNGHGp0e4eY3zuYsOTffEcm5QZmnOpLCuVdjVIUApaK4jQ'}`,
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