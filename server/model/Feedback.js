const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'CanteenItem', required: true },
  rating: { type: Number, min: 1, max: 5, required: true }, // Rating between 1 and 5
  comment: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
