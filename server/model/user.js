const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,unique: false },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: false},
  isAdmin: { type: Boolean, default: false },
  isSuperAdmin:{ type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date },
  transactionHistory:[],
  resetPasswordOtp:{type:String},
  status: { type: String, enum: ['pending', 'active'], default: 'pending' },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});  

module.exports = mongoose.model('User', userSchema);
