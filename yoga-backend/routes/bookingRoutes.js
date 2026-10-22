const express = require('express');
const router = express.Router();
const {
  checkTrialEligibility,
  createBooking,
  getMyBookings,
} = require('../controllers/bookingController');

router.get('/check-trial/:email', checkTrialEligibility);
router.post('/', createBooking);
router.get('/my-bookings/:email', getMyBookings);

module.exports = router;
