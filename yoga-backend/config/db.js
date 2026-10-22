const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Atlas Connected Successfully: ${conn.connection.host} 🚀`);
  } catch (error) {
    console.error(`Error connecting to MongoDB Atlas: ${error.message} ❌`);
    process.exit(1); // Stop server if database connection failscd 
  }
};

module.exports = connectDB;
