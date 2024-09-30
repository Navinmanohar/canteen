const mongoose = require('mongoose');

const adminRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'denied',"cancel"], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AdminRequest', adminRequestSchema);
