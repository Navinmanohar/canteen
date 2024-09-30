const User = require('../model/user');
const AdminRequest = require('../model/AdminRequest');
const Order = require('../model/CanteenOrder');
const Transaction = require('../model/Transaction');



// Approve or deny admin application
exports.manageAdminApplication = async (req, res) => {
  const { userId, action } = req.body;
// console.log(userId, "this is request")
  try {
    const adminRequest = await AdminRequest.findById(userId).populate('userId'); //here id means not user of requested id there id means object id store in admin schema
    if (!adminRequest) {
      return res.status(404).json({ error: 'Admin request not found' });
    }

    if (action === 'approve') {
      const user = await User.findById(adminRequest.userId._id);
      user.isAdmin = true;
      await user.save();

      adminRequest.status = 'approved';
      await adminRequest.save();

      res.status(200).json({ message: 'Admin request approved successfully' });
    } else if (action === 'deny') {
      adminRequest.status = 'denied';
      await adminRequest.save();

      res.status(200).json({ message: 'Admin request denied successfully' });
    } else {
      res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// View all users and admins
exports.getAllUsers = async (req, res) => {
    try {
      // Get all users
      // console.log("called")
      const users = await User.find({isAdmin:false}).select('-password'); // Exclude password from the response
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
exports.getAllAdmins = async (req, res) => {
    try {
      // Get all users
      // console.log("called")
      const users = await User.find({isAdmin:true,isSuperAdmin:false}).select('-password'); // Exclude password from the response
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }; 
   
  // Revoke admin rights
exports.revokeAdmin = async (req, res) => {
    const { userId } = req.body;
  
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user || !user.isAdmin) {
        return res.status(400).json({ error: 'Admin not found or user is not an admin' });
      }
  
      // Revoke admin privileges
      user.isAdmin = false;
      await user.save();
  
      res.status(200).json({ message: 'Admin rights revoked successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
// View detailed information for a specific user or admin
exports.getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the user details excluding the password
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Fetch all orders placed by the user
    const orders = await Order.find({ userId }).populate('items.itemId', 'name price');
    
    // Fetch all transactions related to the user's orders
    const transactions = await Transaction.find({ userId });

    // Fetch the user's admin request (if any)
    const adminRequest = await AdminRequest.findOne({ userId });

    // Return the combined result
    res.status(200).json({
      user,
      orders,
      transactions,
      adminRequest: adminRequest || null, // If no admin request exists, return null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


  exports.viewAdminRequests = async (req, res) => {
    try {
      const pendingRequests = await AdminRequest.find({ status: 'pending' }).populate('userId', 'name email');
      
      if (!pendingRequests.length) {
        return res.status(200).json({ message: 'No pending admin requests.' });
      }
  
      res.status(200).json(pendingRequests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };