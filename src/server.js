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
      Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6Ijk1ODBkNjcwLTJmYzAtNDNjZS05ZjVmLWNjYWI1Y2VjZTY5MSIsImV4cGlyZXMiOiIyMDIzLTA4LTA5VDExOjI0OjEwLjQyOSIsInNlc3Npb25JZCI6ImU1OWU2YzE5LTNkNWUtNGY0OS05NjQ1LWFlYTY2OTcxY2VkYyJ9.L6qJ50onvEghJ5KkjqTHpF7wzmgGApu5ucILx2PQP5Js3zIPINY45j9V2BzZWVcyR1vsdIQUEQwFxJTPlKIrdEl5Rx7qTkj8ZNpaQnt8Mt6P4iMpy1_YguudT90s6bQkQ3ub5ZOfytthQbnBnU_a_Nlam2YlcK39JjCZsWvF_oQbfLG6evfxzqEiVV6Qn92yLWQIZyopBndP1oHibyH8kY-McAj5HetbRmFePZlFfdkMzl3hKlr0fPOD9kYJRYTccyVCXeDafOIB3B8_AA2oMvxFVaGXMA8QTUTF1uoirK_RpU5_8H37Ti6qxtH1jgXM0rYSivAL0I1LVfuU2ujCLw'}`,
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
        Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6Ijk1ODBkNjcwLTJmYzAtNDNjZS05ZjVmLWNjYWI1Y2VjZTY5MSIsImV4cGlyZXMiOiIyMDIzLTA4LTA5VDExOjI0OjEwLjQyOSIsInNlc3Npb25JZCI6ImU1OWU2YzE5LTNkNWUtNGY0OS05NjQ1LWFlYTY2OTcxY2VkYyJ9.L6qJ50onvEghJ5KkjqTHpF7wzmgGApu5ucILx2PQP5Js3zIPINY45j9V2BzZWVcyR1vsdIQUEQwFxJTPlKIrdEl5Rx7qTkj8ZNpaQnt8Mt6P4iMpy1_YguudT90s6bQkQ3ub5ZOfytthQbnBnU_a_Nlam2YlcK39JjCZsWvF_oQbfLG6evfxzqEiVV6Qn92yLWQIZyopBndP1oHibyH8kY-McAj5HetbRmFePZlFfdkMzl3hKlr0fPOD9kYJRYTccyVCXeDafOIB3B8_AA2oMvxFVaGXMA8QTUTF1uoirK_RpU5_8H37Ti6qxtH1jgXM0rYSivAL0I1LVfuU2ujCLw'}`,
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