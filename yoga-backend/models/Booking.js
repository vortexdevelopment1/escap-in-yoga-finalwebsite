const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Optional for direct guests
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  classSlug: {
    type: String,
    required: true,
    trim: true, // e.g. 'hatha-yoga', 'vinyasa-yoga', 'hot-yoga'
  },
  className: {
    type: String,
    required: true,
    trim: true,
  },
  planType: {
    type: String,
    enum: ['FREE_TRIAL', '30_DAY_COHORT'],
    default: '30_DAY_COHORT',
  },
  batchTime: {
    type: String,
    required: true,
    enum: ['06:00', '07:00', '08:00'], // 6-7 AM, 7-8 AM, 8-9 AM
  },
  dateISO: {
    type: String,
    required: true, // e.g. "2026-10-22"
  },
  status: {
    type: String,
    enum: ['CONFIRMED', 'ATTENDED', 'CANCELLED'],
    default: 'CONFIRMED',
  },
  zoomMeetingUrl: {
    type: String,
    default: '',
  },
  whatsappNotificationSent: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index to quickly check free trial abuse
bookingSchema.index({ email: 1, planType: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
