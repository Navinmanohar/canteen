const express = require('express');
const { createOrder, getUserOrders, cancelOrder } = require('../controllers/orderController');
const router = express.Router();

// Route to create an order from the bucket
router.post('/order', createOrder);

// Route to get user's order history
router.get('/order/:userId', getUserOrders);

// Route to cancel an order
router.put('/order/cancel/:orderId', cancelOrder);

module.exports = router;
