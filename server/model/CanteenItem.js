const mongoose = require('mongoose');

const canteenItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  cookingTime: { type: Number, required: true }, // Time in minutes
  description: { type: String, required: true },
  day:{type:String ,required:true},
  imageUrl: { type: String, required: true }, // Image URL for the item
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the canteen admin
}, { timestamps: true });

module.exports = mongoose.model('CanteenItem', canteenItemSchema);
 