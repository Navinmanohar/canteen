const User = require('../model/user');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailService');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


exports.register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists' });

    // Generate OTP and expiration time
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    // Create new user
    user = new User({
      name,
      email,
      phone,
      password,
      otp,
      otpExpires,
    });

    await user.save();

    // Send OTP via email
    await sendEmail(email, 'OTP for Registration', `Your OTP is: ${otp}`);

    res.status(201).json({ message: 'User registered successfully, check your email for OTP' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log("email:",email ,"this otp body:",otp) 
  try {
    const user = await User.findOne({ email }).select("-password");

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Update user status to active
    user.status = 'active';
    user.otp = undefined; // Clear OTP once verified
    user.otpExpires = undefined;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({ message: 'OTP verified successfully', userData:{user,token} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
console.log(email,password)
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    console.log(user,process.env.JWT_SECRET)
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if the user is active
    // if (user.status !== 'active') {
    //   return res.status(400).json({ error: 'Account not active. Complete registration by verifying OTP.' });
    // }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate OTP and expiration time for login
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // user.otp = otp;
    // user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    // await user.save();
 
    // // Send OTP via email
    // await sendEmail(user.email, 'OTP for Login', `Your OTP is: ${otp}`);
    const token =await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({ message:"login succesful ",userData:{user,token} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.otpSend = async (req, res) => {
  const { email } = req.body;
console.log(email)
  try {
    const user = await User.findOne({ email });
   // Generate OTP and expiration time for login
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    await user.save();
 
    // Send OTP via email
    await sendEmail(user.email, 'OTP for Login', `Your OTP is: ${otp}`);

    res.status(200).json({ message: 'Otp send successfull verify'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.verifyProfileOtp = async (req, res) => {
  const{userId}=req.user.id; 
  const { email, otp ,password } = req.body;

  try { 
    const user = await User.findOne({ userId });

    if (!user && user.otp !== otp && user.otpExpires < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Clear OTP once verified
    user.otp = undefined;
    user.otpExpires = undefined;
    if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 12);
  
      await user.save();
  
      res.status(200).json({ message: 'Profile updated successfully' });
    await user.save();

    res.status(200).json({ message: 'Profile update successful',user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.checkUser=async(req,res)=>{
  const email=req.body.email;
  console.log(email)
 try{
  const user=await User.findOne({email}).select("--pasword");
  user?res.status(200).json(user):res.status(200).json({})
 }catch(error){
  console.error(error);
  res.status(500).json({ error: 'Server error' });
 }
}

// Step 1: Request password reset
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
console.log(email,"email form reset")
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
    user.resetPasswordOtp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    await user.save();
console.log(user,otp,"from reset")
    // Send OTP via email (replace with your email service)
    await sendEmail( user.email,'Password Reset Request',`Your password reset OTP is ${otp}. It is valid for 10 minutes.`, );
    // await sendEmail(user.email, 'OTP for Login', `Your OTP is: ${otp}`);
    return res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Step 2: Verify OTP and reset password
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
console.log(email,otp,newPassword,"form rest")
  try {
    const user = await User.findOne({ email, resetPasswordOtp: otp });

    if (!user || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Update user's password and clear OTP
    user.password = newPassword; // Ensure hashing is done if password is stored securely
    user.resetPasswordOtp = undefined;
    user.otpExpires = undefined;

    await user.save();

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};