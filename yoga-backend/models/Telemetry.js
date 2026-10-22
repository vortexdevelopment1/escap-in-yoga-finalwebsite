const mongoose = require('mongoose');

const telemetrySchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  referrer: {
    type: String,
    default: 'direct',
  },
  dwellTimeSeconds: {
    type: Number,
    default: 0,
  },
  deviceType: {
    type: String,
    enum: ['mobile', 'tablet', 'desktop'],
    default: 'desktop',
  },
  ip: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Telemetry', telemetrySchema);
