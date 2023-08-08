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
      Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjAyNTdhMzMwLWY0YjctNDkzNy1hOGE3LTk2ODk2ZjdkYzYxYiIsImV4cGlyZXMiOiIyMDIzLTA4LTA3VDExOjU3OjEzLjQ0MiIsInNlc3Npb25JZCI6ImZkMDdhZjE2LTQ1MTMtNGRhZS1hYmU0LWJkODNhYTA4MWMzMSJ9.L6APTFsH04039Udc013DAfVtI2ftfoIsM1Qgjb3esngyovD4bPcDZpKuKWVHcgRSlAcLHO4cjfsjY8qo5EqMIw3crOcjHJh22xM2xRugSMXgAHyiDDtzjcGsADeW-6yeAsmfl_xabPLpoB1iCeD2g7HwZPd6sLhQo05x0t5MwJdf8zXvrrF6371O9zcRm_wg0w7J5xPnnW068V_x9HoLqU2G5NUScRWMmNZNdgOZcvXRbv91fR7PvKPscDDEap0knaFk8fbkrokZMLhszsycL1tw6ZAxCKcfAct7EDdaEgD7A6MwkQ9W1HRbuFhqsJM4np4KsEhUjGV0MH8nm1uPxA'}`,
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

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

