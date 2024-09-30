const express = require('express');
const { getCanteenAnalytics } = require('../controller/analyticsController');
const {auth} = require('../middleware/auth');
const router = express.Router();

// Get analytics for canteen admin
router.get('/orders/analytics', auth, getCanteenAnalytics);

module.exports = router;
