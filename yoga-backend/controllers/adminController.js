const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');
const Subscription = require('../models/Subscription');
const Telemetry = require('../models/Telemetry');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET || 'escape-in-yoga-super-secret-key-2026';

// @desc    Admin Login with Signed JWT
// @route   POST /api/admin/login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      // Sign standard JWT Token with 15m expiry
      const token = jwt.sign(
        { email: ADMIN_EMAIL, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '15m' }
      );

      return res.status(200).json({
        success: true,
        token,
        expiresIn: 900, // 900 seconds = 15 minutes
        admin: {
          name: 'Avani Jain',
          email: ADMIN_EMAIL,
          role: 'admin',
        },
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get Admin Dashboard metrics & slot occupancy
// @route   GET /api/admin/dashboard
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const freeTrials = await Booking.countDocuments({ planType: 'FREE_TRIAL' });
    const activeSubscribers = await Subscription.countDocuments({ status: 'ACTIVE' });

    // Recent bookings with all details
    const allBookings = await Booking.find().sort({ createdAt: -1 });

    // Slot occupancy for batches (6 AM, 7 AM, 8 AM)
    const slotAggregation = await Booking.aggregate([
      { $match: { status: 'CONFIRMED' } },
      { $group: { _id: '$batchTime', count: { $sum: 1 } } },
    ]);

    const occupancyMap = {
      '06:00': 0,
      '07:00': 0,
      '08:00': 0,
    };

    slotAggregation.forEach((slot) => {
      if (occupancyMap[slot._id] !== undefined) {
        occupancyMap[slot._id] = slot.count;
      }
    });

    res.status(200).json({
      success: true,
      metrics: {
        totalBookings,
        freeTrials,
        activeSubscribers,
      },
      occupancy: [
        { time: '06:00 AM', enrolled: occupancyMap['06:00'], max: 15 },
        { time: '07:00 AM', enrolled: occupancyMap['07:00'], max: 15 },
        { time: '08:00 AM', enrolled: occupancyMap['08:00'], max: 15 },
      ],
      bookings: allBookings,
    });
  } catch (error) {
    console.error('Error fetching admin dashboard:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Log visitor telemetry (BRD feature)
// @route   POST /api/telemetry/log
exports.logTelemetry = async (req, res) => {
  try {
    const { path, referrer, dwellTimeSeconds, deviceType } = req.body;

    await Telemetry.create({
      path: path || '/',
      referrer: referrer || 'direct',
      dwellTimeSeconds: dwellTimeSeconds || 0,
      deviceType: deviceType || 'desktop',
      ip: req.ip,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(200).json({ success: false });
  }
};
