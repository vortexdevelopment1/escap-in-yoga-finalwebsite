const express = require('express');
const router = express.Router();
const {
  getMemberJourney,
  accessSessionRoom,
} = require('../controllers/sessionController');

router.get('/journey/:email', getMemberJourney);
router.post('/access-room', accessSessionRoom);

module.exports = router;
