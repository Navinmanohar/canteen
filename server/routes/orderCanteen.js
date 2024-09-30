const express = require('express');
const { viewOrders, acceptOrder, cancelOrder, notifyUser } = require('../controller/canteenOrderController');
const {canteenAdminAuth} = require('../middleware/adminAuth');
const router = express.Router();

// View all orders for the canteen admin
router.get('/', canteenAdminAuth, viewOrders);

// Accept an order
router.post('/accept/:orderId', acceptOrder);

// Cancel an order
router.post('/cancel/:orderId', cancelOrder);


module.exports = router;
