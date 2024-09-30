const express = require('express'); 
const router = express.Router();
const { verifyProfileOtp } = require('../controller/authuser');
const {auth} = require('../middleware/auth'); // Middleware to verify user token
const { getProfile, updateProfile,applyForAdmin,getOrderHistory, cancelAdminRequest, ItemDetails,createOrder,getUserOrders,cancelOrder, AllItemsUser } = require('../controller/userController');
const { AllItems } = require('../controller/canteenController');



router.get('/order-history', auth, getOrderHistory); // Fetch order history for a user
router.get('/item', ItemDetails); // Fetch order history for a user

router.post('/apply-admin', auth, applyForAdmin);
router.post('/cancel-admin', auth, cancelAdminRequest);
router.get('/profile', getProfile);  // Get user profile
router.post('/update/profile', auth, updateProfile);  // Update user profile
router.post('/verify-profile-otp', auth, verifyProfileOtp);  // Update user profile
router.post('/orders',auth, createOrder);
router.get('/all-item', AllItemsUser);// make for user here authentication required {canteenAdminAuth}

// Route to get user's order history
router.get('/order/:userId',auth, getUserOrders);

// Route to cancel an order
router.put('/order/cancel/:orderId',auth, cancelOrder);
module.exports = router;
