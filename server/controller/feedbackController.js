const Feedback = require('../model/Feedback');

// View feedback for a specific canteen item (for admins)
exports.viewFeedback = async (req, res) => {
  const { itemId } = req.params;

  try {
    const feedbacks = await Feedback.find({ itemId }).populate('userId', 'name');
    
    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({ message: 'No feedback found for this item' });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Leave feedback for a canteen item
exports.leaveFeedback = async (req, res) => {
  const { itemId, rating, comment } = req.body;

  try {
    const feedback = new Feedback({
      userId: req.user.id,
      itemId,
      rating,
      comment,
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
