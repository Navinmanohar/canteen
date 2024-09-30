const jwt = require('jsonwebtoken');
const User = require('../model/user');

// Middleware to check if the user is a super admin
const superAdminAuth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
// console.log(token,"this is admin token")
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Find the user and check if they are a super admin
    const user = await User.findById(req.user.id);
    if (!user || !user.isSuperAdmin) {
      return res.status(403).json({ error: 'Access denied. You are not a Super Admin.' });
    }

    next();  // Super Admin is authenticated, proceed to the next middleware
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Middleware to check if the user is a canteen admin
const canteenAdminAuth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
// console.log(token,"from canteen admin")
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Find the user and check if they are a canteen admin
    const user = await User.findById(req.user.id);
    // console.log(user,"from middle")
    if (!user || !user.isAdmin || user.isSuperAdmin) {
      return res.status(403).json({ error: 'Access denied. You are not a Canteen Admin.' });
    }

    next();  // Canteen Admin is authenticated, proceed to the next middleware
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = { superAdminAuth, canteenAdminAuth };
