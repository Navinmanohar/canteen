const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user placing the order
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'CanteenItem', required: true }, // Ordered item
    quantity: { type: Number, required: true }, // Quantity of the item
    imageUrl:{type:String,required:true},
    name:{type:String,required:true},
    price:{type:String,required:true},
    cookingTime: { type: Number, required: true },
    orderId:{type:String,required:false}
  }],
  amount:{type:Number,required:false},
  order_Id:{type:String,required:false},
  payment_Id:{type:String,required:false},
  reason:{type:String,required:false},
  readyBy:{ type: Number, required: false},
  totalPrice: { type: Number, required: true }, // Total price of the order
  status: { type: String, enum: ['pending', 'accepted','refund', 'canceled'], default: 'pending' }, // Order status
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Admin processing the order
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
