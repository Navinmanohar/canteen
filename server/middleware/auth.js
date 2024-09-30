const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
console.log(token,"toke order")
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user to the request
    req.user = decoded;
    
    // Check if the user still exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token. User not found.' });
    }

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid token.' });
  }
};
exports.adminAuth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user to the request
    req.user = decoded;
    
    // Check if the user still exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token. User not found.' });
    }
    if(user.isAdmin)
     next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid token.' });
  }
};

