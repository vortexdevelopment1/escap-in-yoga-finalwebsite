const express = require('express');
const router = express.Router();
const {
  studentForgotPassword,
  studentResetPassword,
} = require('../controllers/authController');

// Student Password Reset Routes
router.post('/student/forgot-password', studentForgotPassword);
router.post('/student/reset-password', studentResetPassword);

module.exports = router;
