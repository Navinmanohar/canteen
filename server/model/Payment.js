const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model to track which user made the payment
      required: true,
    },
    order_id: {
      type: String,
      required: true,
    },
    items: [{
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'CanteenItem', required: true }, // Ordered item
      quantity: { type: Number, required: true }, // Quantity of the item
    }],
    payment_id: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['success','refunded', 'failed'],
      default: 'success',
    },
    refundDetails:{
       refundId: {type:String,required:false},
       amount:{type:Number,required:false}, // Store in INR instead of paise
      status:{ type:String,required:false},
      created_at:{type:String,required:false},
      reason: {type:String,required:false},
    },
      receipt: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
