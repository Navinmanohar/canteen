const express = require('express');
const { createOrder } = require('../controller/canteenOrderController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// router.post('/orders', auth, createOrder);

module.exports = router;
