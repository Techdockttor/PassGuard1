const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Set strictQuery to suppress the warning
mongoose.set('strictQuery', true);

// Enable Mongoose debugging
mongoose.set('debug', true);

// Funtion to get Mongo URI from .ENV
function getMongoURI() {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/passguarddb';
  return mongoURI;
}

// Function to connect to MongoDB
async function connectDB() {
  const mongoURI = getMongoURI();
  console.log('MongoURI:', mongoURI);

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Unified topology for better server discovery and monitoring
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err; // Re-throw the error to handle it in index.js
  }
}

// Set up event listeners for the MongoDB connection
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('MongoDB connection is open');
});

module.exports = connectDB;
