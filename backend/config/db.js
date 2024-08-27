const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// StrictQuery to suppress the warning
mongoose.set('strictQuery', true);

// Enable Mongoose debugging in development
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

// Function to get Mongo URI from .env
function getMongoURI() {
  let mongoURI;

  if (process.env.NODE_ENV === 'test') {
    mongoURI = process.env.MONGO_URI_TEST;
  } else {
    mongoURI = process.env.MONGO_URI;
  }

  console.log('MongoURI:', mongoURI);
  return mongoURI;
}

// Function to connect to MongoDB
async function connectDB() {
  const mongoURI = getMongoURI();
  console.log('MongoURI:', mongoURI);

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true, // Parses MongoDB connection string properly
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err; // Re-throw the error to handle it in app.js
  }
}

// event listeners for the MongoDB connection
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('MongoDB connection is open');
});

// Shutdown Handling for Database Disconnection
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('MongoDB disconnected on app termination');
  process.exit(0);
});

module.exports = connectDB;
