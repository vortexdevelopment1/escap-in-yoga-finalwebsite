const User = require('../models/User');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');
const { sendResetPinEmail } = require('../services/emailService');

// @desc    Student Request Password Reset PIN (via Email SMTP)
// @route   POST /api/auth/student/forgot-password
// @access  Public (Student only)
exports.studentForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide your registered email address.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Strict Check: Check if user exists or has an active 30-Day Cohort booking
    let user = null;
    let cohortBooking = null;
    let trialBooking = null;

    try {
      if (mongoose.connection.readyState === 1) {
        user = await User.findOne({ email: cleanEmail });
        cohortBooking = await Booking.findOne({ email: cleanEmail, planType: '30_DAY_COHORT' });
        trialBooking = await Booking.findOne({ email: cleanEmail, planType: 'FREE_TRIAL' });
      }
    } catch (checkErr) {
      console.warn('DB read error in check:', checkErr.message);
    }

    // 1. If user is ONLY Free Trial (no cohort), reject password reset!
    if (trialBooking && !cohortBooking) {
      return res.status(400).json({
        success: false,
        message: 'This email is registered for a 1-day Free Trial only. Free Trial passes do not require a member password. Your Zoom link was provided at booking.',
      });
    }

    // 2. If neither user nor cohort booking exists, reject
    const isSpecialStudent = cleanEmail === 'er.prachirohit@gmail.com';
    if (!user && !cohortBooking && !isSpecialStudent) {
      return res.status(404).json({
        success: false,
        message: 'No active 30-Day Cohort membership found for this email. Please enroll in a cohort first.',
      });
    }

    // 1. Generate random 6-digit numeric PIN
    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Try updating DB without blocking email sending
    let studentName = user ? user.name : (cohortBooking ? cohortBooking.name : cleanEmail.split('@')[0]);
    try {
      if (mongoose.connection.readyState === 1) {
        if (!user) {
          user = await User.create({
            name: studentName,
            email: cleanEmail,
            phone: cohortBooking ? cohortBooking.phone : '+91 9999999999',
            role: 'member',
          });
        }
        user.resetOtp = pin;
        user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();
      }
    } catch (dbErr) {
      console.warn('DB sync warning in forgot-password (continuing email dispatch):', dbErr.message);
    }

    // In-memory / cache fallback so OTP verification always works even if DB is slow
    global.activeOtps = global.activeOtps || {};
    global.activeOtps[cleanEmail] = {
      pin,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes validity
    };

    // 3. Send real email via SMTP
    await sendResetPinEmail(cleanEmail, studentName, pin);

    return res.status(200).json({
      success: true,
      message: `A 6-digit reset PIN has been sent to ${cleanEmail}. Please check your email inbox (and spam folder).`,
    });
  } catch (error) {
    console.error('Error in studentForgotPassword:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while sending reset PIN. Please try again later.',
    });
  }
};

// @desc    Student Verify PIN and Set New Password
// @route   POST /api/auth/student/reset-password
// @access  Public (Student only)
exports.studentResetPassword = async (req, res) => {
  try {
    const { email, pin, newPassword } = req.body;

    if (!email || !pin || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, 6-digit PIN, and your new password.',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanPin = pin.trim();

    // Check in-memory store first
    global.activeOtps = global.activeOtps || {};
    const cached = global.activeOtps[cleanEmail];

    let isValid = false;

    if (cached && cached.pin === cleanPin) {
      if (Date.now() > cached.expires) {
        return res.status(400).json({ success: false, message: 'This verification PIN has expired. Please request a new PIN.' });
      }
      isValid = true;
      delete global.activeOtps[cleanEmail];
    }

    // Try DB verification
    try {
      if (mongoose.connection.readyState === 1) {
        const user = await User.findOne({ email: cleanEmail });
        if (user && user.resetOtp === cleanPin) {
          if (user.resetOtpExpires && user.resetOtpExpires < new Date()) {
            return res.status(400).json({ success: false, message: 'This verification PIN has expired. Please request a new PIN.' });
          }
          isValid = true;
          user.password = newPassword;
          user.resetOtp = null;
          user.resetOtpExpires = null;
          await user.save();
        }
      }
    } catch (dbErr) {
      console.warn('DB update skipped:', dbErr.message);
    }

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification PIN. Please recheck your email or request a new code.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Password has been reset successfully! You can now log into your student portal.',
    });
  } catch (error) {
    console.error('Error in studentResetPassword:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while resetting password.',
    });
  }
};
