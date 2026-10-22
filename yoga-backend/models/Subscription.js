const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  },
  classSlug: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  batchTime: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  durationDays: {
    type: Number,
    default: 30,
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'COMPLETED', 'PAUSED'],
    default: 'ACTIVE',
  },
  attendanceRecords: [
    {
      dayNumber: Number,
      date: Date,
      attended: Boolean,
      zoomJoinTime: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
