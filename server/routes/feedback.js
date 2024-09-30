const express = require('express');
const { leaveFeedback, viewFeedback } = require('../controller/feedbackController');
const {auth} = require('../middleware/auth');
const router = express.Router();

// Leave feedback
router.post('/', auth, leaveFeedback);

// View feedback for a specific item (for canteen admins)
router.get('/:itemId', auth, viewFeedback);

module.exports = router;
