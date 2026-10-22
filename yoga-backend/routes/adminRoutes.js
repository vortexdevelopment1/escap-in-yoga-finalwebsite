const express = require('express');
const router = express.Router();
const {
  adminLogin,
  getAdminDashboard,
  logTelemetry,
} = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/login', adminLogin);
router.get('/dashboard', protectAdmin, getAdminDashboard);
router.post('/telemetry/log', logTelemetry);

module.exports = router;
