const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Atlas Connected Successfully: ${conn.connection.host} 🚀`);
  } catch (error) {
    console.error(`⚠️ MongoDB Atlas Warning: ${error.message}`);
    console.log('🔄 Server continuing to run so APIs and OTP service stay ACTIVE...');
    // Do NOT call process.exit(1) so server NEVER crashes
  }
};

module.exports = connectDB;
