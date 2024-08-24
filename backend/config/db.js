const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
	console.log('Mongo URI:', mongoURI);

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB successfully at ${mongoURI}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    // Exit the process
    process.exit(1);
  }
};

module.exports = connectDB;
