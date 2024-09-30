const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../model/Payment'); // Import the Payment model
const User = require('../model/user'); // Assuming User model exists
const Order =require("../model/CanteenOrder")

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Step 1: Create Order with User Data
exports.createOrder = async (req, res) => {
  const { amount, currency, userId } = req.body;
console.log(req.body,"this is  create order")
  try {
    const user = await User.findById(userId); // Find the user making the payment
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise for INR)
      currency: currency || 'INR',
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(200).json({ success: true, order, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Something went wrong', error });
  }
};
 
// Step 2: Verify Payment and Save Data
exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, amount,itemId } = req.body;
  
  console.log("orderid:",razorpay_order_id,"paymentId", razorpay_payment_id,"signature:", razorpay_signature, userId, amount ,"this is verify body")
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    try {
      // Find the user making the payment
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Save payment details in the database
      const payment = new Payment({
        user: user._id, // Associate payment with the user
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        signature: razorpay_signature,
        amount: amount, // Ensure amount is passed from the request
        status: 'success',
        receipt: req.body.receipt,
      });

      await payment.save();

      // You can also update user transaction history here (if you have such a field)
      user.transactionHistory = user.transactionHistory || [];
      user.transactionHistory.push(payment._id); // Save payment ID in the user's transaction history

      await user.save();

      res.status(200).json({ success: true, message: 'Payment verified and recorded successfully', payment });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error saving payment details', error });
    }
  } else {
    res.status(400).json({ success: false, message: 'Invalid signature, payment verification failed' });
  }
};
exports.transactions = async (req, res) => {
  try {
    // console.log("Hiiiiii")
    console.log(req.body,req.user,"this form transaction")
    const transactions = await Payment.find();
    res.status(200).json({message:"Transaction geting succesfull",transactions});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
