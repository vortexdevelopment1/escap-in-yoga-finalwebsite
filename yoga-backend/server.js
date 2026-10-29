const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Route files
const bookingRoutes = require('./routes/bookingRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check & root endpoints
app.get(['/', '/api', '/api/health'], (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Escape in Yoga Backend API is running smoothly! 🧘‍♀️',
    timestamp: new Date().toISOString(),
  });
});

// Mount API Routes (support both /api/* and direct /* prefixes to prevent route mismatch errors)
app.use('/api/bookings', bookingRoutes);
app.use('/bookings', bookingRoutes);

app.use('/api/sessions', sessionRoutes);
app.use('/sessions', sessionRoutes);

app.use('/api/admin', adminRoutes);
app.use('/admin', adminRoutes);

app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
