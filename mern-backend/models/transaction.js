const mongoose = require('mongoose');

// Define the schema for transactions
const transactionSchema = new mongoose.Schema({
  title: String,  // Title of the transaction
  description: String,  // Description of the transaction
  price: Number,  // Price of the transaction
  dateOfSale: {
    type: Date,
    default: Date.now,  // Set default value to current date/time if not provided
    get: (v) => v && v.toISOString().slice(0, 10),  // Getter to return date string in 'YYYY-MM-DD' format
  },
  category: String,  // Category of the transaction
  month: String,  // Month of the transaction as a string
  sold: {
    type: Boolean,
    default: false  // Set default value to false if not provided
  },
  image: String  // URL of the image associated with the transaction
});

// Create a Mongoose model based on the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

// Export the model to be used in other parts of the application
module.exports = Transaction;
