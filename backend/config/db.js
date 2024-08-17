const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Set strictQuery to suppress the warning
mongoose.set('strictQuery', true);

// Enable Mongoose debugging in development mode only
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

// Function to get Mongo URI from .env or fallback
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
      useCreateIndex: true, // Automatically create indexes (if needed)
      useFindAndModify: false // Opt-out of deprecated findAndModify()
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err; // Re-throw the error to handle it in app.js
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

// Graceful Shutdown Handling for Database Disconnection
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('MongoDB disconnected on app termination');
  process.exit(0);
});

module.exports = connectDB;
