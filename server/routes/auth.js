const express = require('express'); 
const router = express.Router();
const { login,register, verifyOtp, checkUser, otpSend,requestPasswordReset, resetPassword } = require('../controller/authuser'); //verifyProfileOtp we need to impliment this logic




router.post('/register', register); 
router.post('/verify-otp', verifyOtp);
router.post('/check', checkUser);
router.post('/otp', otpSend);
router.post('/request-reset-password', requestPasswordReset);
router.post('/reset-password', resetPassword);


router.post('/login', login);


module.exports=router