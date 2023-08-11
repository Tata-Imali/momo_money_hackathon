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
      Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjA5Y2NiNjg2LTdlYTUtNGZmMy1iMjQ4LWIzZTFmMjZmNDcxMSIsImV4cGlyZXMiOiIyMDIzLTA4LTExVDEyOjE2OjI0Ljc2MyIsInNlc3Npb25JZCI6ImU5NjM3OTMxLTcwZDMtNDI0Zi1hN2JlLWNhOTVkOTk4ZTAyNSJ9.WbY8-DkJySQbpgOSTCrhnqbocXpb9AnBkbKvl0la8ZpbESasSXPFHu_ME_K07Ps5Jg-X9YEg--Bza42rjAmyKU7LzBZ0l9NGh07bTpLYPeo5G6BtkrVZwHWFSj6D65ZybGcRk1VT4iVujWcbFhPKUZgQqiVSKgb0Xf1qnXHrUGBoe_dkGL6PjxaECRvz1v-gTfjGLNeXkkArKc5Gp_Y0cE7f-fnNxah7VHHGPzRkA76UOvubDUd6af94WUdUkT4PNxmYEnBIJ8Mf0Z2O7A9j9-ieML-Ae0WLySmOFiyllGOjOQH3nqDhwZRaor5c3dMqFSv7HcSgFqiDsimI__5dig'}`,
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
        Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjA5Y2NiNjg2LTdlYTUtNGZmMy1iMjQ4LWIzZTFmMjZmNDcxMSIsImV4cGlyZXMiOiIyMDIzLTA4LTExVDEyOjE2OjI0Ljc2MyIsInNlc3Npb25JZCI6ImU5NjM3OTMxLTcwZDMtNDI0Zi1hN2JlLWNhOTVkOTk4ZTAyNSJ9.WbY8-DkJySQbpgOSTCrhnqbocXpb9AnBkbKvl0la8ZpbESasSXPFHu_ME_K07Ps5Jg-X9YEg--Bza42rjAmyKU7LzBZ0l9NGh07bTpLYPeo5G6BtkrVZwHWFSj6D65ZybGcRk1VT4iVujWcbFhPKUZgQqiVSKgb0Xf1qnXHrUGBoe_dkGL6PjxaECRvz1v-gTfjGLNeXkkArKc5Gp_Y0cE7f-fnNxah7VHHGPzRkA76UOvubDUd6af94WUdUkT4PNxmYEnBIJ8Mf0Z2O7A9j9-ieML-Ae0WLySmOFiyllGOjOQH3nqDhwZRaor5c3dMqFSv7HcSgFqiDsimI__5dig'}`,
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