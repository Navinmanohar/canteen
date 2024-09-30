const express = require('express');
const { addCanteenItem, updateCanteenItem, deleteCanteenItem, AllItems } = require('../controller/canteenController');
const { viewOrders, acceptOrder, cancelOrder, getOrderById } = require('../controller/canteenOrderController');
// const { viewTransactions } = require('../controller/transactionController');
const {  transactions} = require('../controller/paymentController');
const upload = require('../utils/multer'); // Multer for image upload
const {canteenAdminAuth} = require('../middleware/adminAuth');
const router = express.Router();

// Canteen Item Management
router.post('/item-add', canteenAdminAuth, upload.single('image'), addCanteenItem);
router.put('/item/update/:itemId', canteenAdminAuth, upload.single('image'), updateCanteenItem); // Update item including image
router.delete('/item/delete/:itemId', canteenAdminAuth, deleteCanteenItem);
router.get('/all-item',canteenAdminAuth, AllItems);// make for user here authentication required {canteenAdminAuth}

// Order Management
router.get('/view-orders',canteenAdminAuth, viewOrders);
router.post('/order/accept/:orderId',canteenAdminAuth,acceptOrder);// in both accept and deny route middleware is required 
router.post('/order/cancel/:orderId',canteenAdminAuth,  cancelOrder);
router.get('/:orderId',canteenAdminAuth, getOrderById);
// Transaction Management 
router.get('/user/transactions',canteenAdminAuth, transactions);

module.exports = router;
