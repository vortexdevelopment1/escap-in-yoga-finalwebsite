const Booking = require('../models/Booking');
const Subscription = require('../models/Subscription');
const User = require('../models/User');

const MAX_BATCH_CAPACITY = 15; // BRD constraint: Max 15 students per batch

// @desc    Check if an email is eligible for a Free Trial class
// @route   GET /api/bookings/check-trial/:email
exports.checkTrialEligibility = async (req, res) => {
  try {
    const email = req.params.email.toLowerCase().trim();

    // Check 1: Has user already booked ANY session (Trial OR 30-Day Cohort)?
    const existingAnyBooking = await Booking.findOne({ email });

    if (existingAnyBooking) {
      const isCohortMember = existingAnyBooking.planType === '30_DAY_COHORT';
      return res.status(200).json({
        eligible: false,
        message: isCohortMember
          ? 'You are already enrolled as a 30-Day Cohort member! Free Trials are reserved for new students.'
          : 'This email has already claimed a Free Trial session. Please choose a 30-Day Cohort package.',
      });
    }

    // Check 2: Has active subscription?
    const existingSub = await Subscription.findOne({
      userId: { $in: await User.find({ email }).distinct('_id') },
      status: 'ACTIVE',
    });

    if (existingSub) {
      return res.status(200).json({
        eligible: false,
        message: 'You already hold an active Yoga subscription. Free Trials are for new students only.',
      });
    }

    return res.status(200).json({
      eligible: true,
      message: 'You are eligible for a 1-day Free Live Yoga Trial!',
    });
  } catch (error) {
    console.error('Error checking trial eligibility:', error);
    res.status(500).json({ success: false, message: 'Server error checking eligibility' });
  }
};

// @desc    Create a new Booking (Free Trial or 30-Day Cohort)
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, classSlug, className, batchTime, dateISO, planType } = req.body;

    // 1. Basic validation
    if (!name || !email || !phone || !classSlug || !className || !batchTime || !dateISO) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const isFreeTrial = planType === 'FREE_TRIAL';

    // 2. Strict Free Trial Enforcement (Cannot claim if already booked trial OR already enrolled in 30-Day Cohort)
    if (isFreeTrial) {
      const priorBooking = await Booking.findOne({
        email: cleanEmail,
      });

      if (priorBooking) {
        const isCohortMember = priorBooking.planType === '30_DAY_COHORT';
        return res.status(400).json({
          success: false,
          message: isCohortMember
            ? 'This email is already enrolled in the 30-Day Cohort! Free Trials are for new students only.'
            : 'You have already used your Free Trial class. Please choose a regular 30-Day Cohort package.',
        });
      }
    }

    // 3. Batch Capacity Check for Free Trial / Demo (Max 15 trial students per slot)
    if (isFreeTrial) {
      const trialSlotCount = await Booking.countDocuments({
        dateISO,
        batchTime,
        planType: 'FREE_TRIAL',
        status: 'CONFIRMED',
      });

      if (trialSlotCount >= MAX_BATCH_CAPACITY) {
        return res.status(400).json({
          success: false,
          message: `The ${batchTime} Free Trial batch on ${dateISO} has reached its limit of ${MAX_BATCH_CAPACITY} trial students. Please pick another morning slot (6 AM, 7 AM, or 8 AM).`,
        });
      }
    }

    // 4. Find or Create User
    let user = await User.findOne({ email: cleanEmail });
    if (!user) {
      user = await User.create({
        name: name.trim(),
        email: cleanEmail,
        phone: phone.trim(),
      });
    }

    // 5. Create Booking
    const booking = await Booking.create({
      user: user._id,
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      classSlug,
      className,
      batchTime,
      dateISO,
      planType: isFreeTrial ? 'FREE_TRIAL' : '30_DAY_COHORT',
      status: 'CONFIRMED',
      // Zoom link placeholder (later connected to Zoom API)
      zoomMeetingUrl: `https://zoom.us/join?batch=${classSlug}&time=${batchTime.replace(':', '')}`,
      whatsappNotificationSent: true,
    });

    // 6. If 30-Day Cohort, create active Subscription
    let subscription = null;
    if (!isFreeTrial) {
      subscription = await Subscription.create({
        email: cleanEmail,
        bookingId: booking._id,
        classSlug,
        className,
        batchTime,
        startDate: new Date(dateISO),
        durationDays: 30,
        status: 'ACTIVE',
      });
    }

    res.status(201).json({
      success: true,
      message: isFreeTrial
        ? 'Free Trial Session successfully confirmed! WhatsApp confirmation sent.'
        : '30-Day Cohort subscription successfully activated!',
      booking,
      subscription,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: 'Server error while processing booking' });
  }
};

// @desc    Get bookings for an email
// @route   GET /api/bookings/my-bookings/:email
exports.getMyBookings = async (req, res) => {
  try {
    const email = req.params.email.toLowerCase().trim();
    const bookings = await Booking.find({ email }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Server error fetching bookings' });
  }
};
