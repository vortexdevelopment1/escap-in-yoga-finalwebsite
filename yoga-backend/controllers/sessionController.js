const Subscription = require('../models/Subscription');
const Booking = require('../models/Booking');

// @desc    Get member's 30-day journey and current unlocked day
// @route   GET /api/sessions/journey/:email
exports.getMemberJourney = async (req, res) => {
  try {
    const email = req.params.email.toLowerCase().trim();

    // Check active subscription
    const subscription = await Subscription.findOne({
      email,
      status: 'ACTIVE',
    }).sort({ createdAt: -1 });

    if (!subscription) {
      // Check if user has an active free trial
      const trialBooking = await Booking.findOne({
        email,
        planType: 'FREE_TRIAL',
        status: 'CONFIRMED',
      }).sort({ createdAt: -1 });

      if (trialBooking) {
        return res.status(200).json({
          success: true,
          isTrial: true,
          trialBooking,
        });
      }

      return res.status(404).json({
        success: false,
        message: 'No active subscription or free trial found for this email.',
      });
    }

    // Calculate current day based on Start Date and Today
    const now = new Date();
    const start = new Date(subscription.startDate);
    const diffTime = Math.abs(now.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const currentDay = Math.min(Math.max(diffDays + 1, 1), 30);

    const progressPercentage = Math.round((currentDay / 30) * 100);

    res.status(200).json({
      success: true,
      isTrial: false,
      subscriptionId: subscription._id,
      className: subscription.className,
      batchTime: subscription.batchTime,
      startDate: subscription.startDate,
      currentDay,
      totalDays: 30,
      progressPercentage,
      status: subscription.status,
    });
  } catch (error) {
    console.error('Error fetching journey:', error);
    res.status(500).json({ success: false, message: 'Server error fetching journey' });
  }
};

// @desc    Verify email & grant Zoom Meeting Link for a specific day
// @route   POST /api/sessions/access-room
exports.accessSessionRoom = async (req, res) => {
  try {
    const { email, dayNumber } = req.body;

    if (!email || dayNumber === undefined) {
      return res.status(400).json({ success: false, message: 'Email and day number required' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Find active subscription or trial
    const subscription = await Subscription.findOne({ email: cleanEmail, status: 'ACTIVE' });
    const trial = await Booking.findOne({ email: cleanEmail, planType: 'FREE_TRIAL', status: 'CONFIRMED' });

    if (!subscription && !trial) {
      return res.status(403).json({
        success: false,
        verified: false,
        message: 'Access Denied: No valid registration found for this email.',
      });
    }

    // If subscription, enforce Day-Locking (Cannot access future days)
    if (subscription) {
      const now = new Date();
      const start = new Date(subscription.startDate);
      const diffTime = Math.abs(now.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const currentAllowedDay = diffDays + 1;

      if (dayNumber > currentAllowedDay) {
        return res.status(403).json({
          success: false,
          verified: true,
          locked: true,
          message: `Day ${dayNumber} is strictly locked. It will open on its designated date.`,
        });
      }
    }

    // Email Verified & Authorized for Zoom Roster
    const meetingUrl = `https://zoom.us/w/escape-in-yoga-${subscription ? subscription.classSlug : trial.classSlug}?email=${encodeURIComponent(cleanEmail)}`;

    res.status(200).json({
      success: true,
      verified: true,
      locked: false,
      meetingUrl,
      verifiedEmail: cleanEmail,
      message: 'Access Granted: Your email is verified on the live Zoom roster.',
    });
  } catch (error) {
    console.error('Error granting session access:', error);
    res.status(500).json({ success: false, message: 'Server error processing room access' });
  }
};
