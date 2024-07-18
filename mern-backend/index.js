require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const transactionsRouter = require('./routes/transactions');  // Import routes from transactions.js

const app = express();  // Create an Express application

app.use(express.json());  // Middleware to parse JSON bodies of requests
app.use(cors());  // Middleware to enable CORS (Cross-Origin Resource Sharing)

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');  // Success message if connection is established
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);  // Error message if connection fails
  });

// Mount transactionsRouter under the '/api' prefix
app.use('/api', transactionsRouter);

const PORT = process.env.PORT || 5000;  // Use the port from environment variable or default to 5000

// Start the server and log the port it's running on
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
