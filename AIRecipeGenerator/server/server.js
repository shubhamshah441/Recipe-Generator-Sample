// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

// Initialize OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Define a route to interact with OpenAI
app.post('/ask', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Call the OpenAI API
    const response = await openai.createCompletion({
      model: "text-davinci-003", // Use the appropriate model
      prompt: prompt,
      max_tokens: 150, // Adjust as needed
    });

    // Send the response back to the client
    res.json({ response: response.data.choices[0].text });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});