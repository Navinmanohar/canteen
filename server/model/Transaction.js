const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who made the transaction
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Associated order
  amount: { type: Number, required: true }, // Amount paid for the transaction
  status: { type: String, enum: ['successful', 'failed'], default: 'successful' }, // Transaction status
  paymentMethod: { type: String, required: true }, // E.g., card, UPI, etc.
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
