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
      Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjBiNjg2N2IxLTRlN2EtNGE5MC04ZmVkLWQxZjVlMmMyZjgyOSIsImV4cGlyZXMiOiIyMDIzLTA4LTE4VDEzOjE2OjI3LjU0MyIsInNlc3Npb25JZCI6IjFkZjNjMDEyLTQ0OTAtNDFjMi1hMWViLWVkMDExZTQwMjdlMCJ9.lLnWErZslJbppJMxJwnL4gkyGZ6tt8tdNDgKJnNyJEiU13NGXQTCBpqPTjG5aO0wJuRg0JdEcbrmEyI0vBcIsplPYwuBGt6jJEfRfU1Y9kmAzAOAKs9IvgJ88hRHKseYQWnYx0moZfQR3Ysabb2TW31k6o-Ur7RGBHmUzBmfkE8fq68vglsZ8Fw2LAwVxyvS35YPkXp5j5KEsham_-5s0CmBdbIWEwzCbT8GjuRy-wnT-d9qYMhVjmtg1Hrbejn-4X16ua2NJ-oP35BPj89D822uyXWJEmdHxi_7jJE_rjuH1tWa9hDGWdRh1_ePyVUJohAwC_5IqzfMfMCcQXyXEg'}`, // Use the Authorization token for the Collections product
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
      Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjdiMmYxYWU0LTAzZDMtNDU5NC1hOTk3LWI5M2UwZmRjMmRmZSIsImV4cGlyZXMiOiIyMDIzLTA4LTE4VDEzOjE4OjA1LjY3NiIsInNlc3Npb25JZCI6IjdlMmUzZjg2LTYxZDQtNGIzNC04OWM4LWU1ODU1NzVhMGY4MyJ9.BetGPqdZxxFJJi3Wt5lho4cQ0nncd79B4R_8fbM-k3kfMzlldJerCXeITc2Ab2kfWSeDPwEWVHzxIP6cZfrXXJcfWrWTJ8HRoPspwoFQQHB7FmPUOe9dWvXsRGUIn2rMPIB_qXCrqGw-m__c27KyGYwJ-CMFeXJ8GRMJNdI2NvlJPdxRD-tTKDl85Pz3nE25Nm9ZWMyMVQOD3ZqVXoxTyyo_cZzMtGe2hB7Fjez2CHeNtWFP9xGihL4qvr3wieWNqox3Pb2ryw2GcCuF5SIDd3WlEmMGEo8l6o8_jkZdE2i_aLiSjylp-VTwxMtIiP9xBYEAiXQueV17iTtR-BA0ow'}`, // Use the Authorization token for the Disbursements product
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
        Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjBiNjg2N2IxLTRlN2EtNGE5MC04ZmVkLWQxZjVlMmMyZjgyOSIsImV4cGlyZXMiOiIyMDIzLTA4LTE4VDEzOjE2OjI3LjU0MyIsInNlc3Npb25JZCI6IjFkZjNjMDEyLTQ0OTAtNDFjMi1hMWViLWVkMDExZTQwMjdlMCJ9.lLnWErZslJbppJMxJwnL4gkyGZ6tt8tdNDgKJnNyJEiU13NGXQTCBpqPTjG5aO0wJuRg0JdEcbrmEyI0vBcIsplPYwuBGt6jJEfRfU1Y9kmAzAOAKs9IvgJ88hRHKseYQWnYx0moZfQR3Ysabb2TW31k6o-Ur7RGBHmUzBmfkE8fq68vglsZ8Fw2LAwVxyvS35YPkXp5j5KEsham_-5s0CmBdbIWEwzCbT8GjuRy-wnT-d9qYMhVjmtg1Hrbejn-4X16ua2NJ-oP35BPj89D822uyXWJEmdHxi_7jJE_rjuH1tWa9hDGWdRh1_ePyVUJohAwC_5IqzfMfMCcQXyXEg'}`, // Use the Authorization token for the Collections product
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
  
  // Define an API endpoint to predict credit scores
app.post('/api/predict-credit-score', async (req, res) => {
  try {
    // Get the necessary data from the request body (modify as needed)
    const { age, income, creditHistory } = req.body;

    // Your credit score prediction logic here (modify as needed)
    // For example, a simple scoring logic might be:
    let creditScore = 0;
    if (age > 30) creditScore += 10;
    if (income > 50000) creditScore += 20;
    if (creditHistory === 'good') creditScore += 30;

    // Send back the credit score prediction
    res.json({ creditScore });
  } catch (error) {
    console.error('Error predicting credit score:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});