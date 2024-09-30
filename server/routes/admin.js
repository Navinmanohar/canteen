const express = require('express');
const { manageAdminApplication, getAllUsers, revokeAdmin, getUserDetails,viewAdminRequests, getAllAdmins } = require('../controller/adminController');
const {superAdminAuth} = require('../middleware/adminAuth');
const router = express.Router();

// Routes for super admin management
router.post('/manage-application', superAdminAuth, manageAdminApplication);  // Approve/Deny admin requests
router.get('/users', superAdminAuth, getAllUsers);  // View all users and admins
router.get('/all-admin', superAdminAuth, getAllAdmins);  // View all users and admins
router.post('/revoke', superAdminAuth, revokeAdmin);  // Revoke admin rights
router.get('/user/:userId', superAdminAuth, getUserDetails);  // View specific user/admin details
router.get('/admin-requests', superAdminAuth, viewAdminRequests);
module.exports = router;
