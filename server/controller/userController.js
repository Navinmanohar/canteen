const User = require('../model/user');
const Order = require('../model/CanteenOrder');
const sendEmail = require('../utils/emailService');
const AdminRequest = require('../model/AdminRequest');
const CanteenItem = require('../model/CanteenItem');

// Apply for admin role (user sends request)
exports.applyForAdmin = async (req, res) => {
  const userId = req.user.id;
console.log(userId, "id apply")
  try {
    const existingRequest = await AdminRequest.findOne({ userId, status: 'pending' });
    if (existingRequest) {
      return res.status(400).json({ error: 'You have already applied for admin access. Please wait for approval.' });
    }
 
    const user = await User.findById(userId);
    if (user.isAdmin) {
      return res.status(400).json({ error: 'You are already an admin.' });
    }

    const adminRequest = new AdminRequest({ userId });

    await adminRequest.save();

    // Send email to Super Admin
    await sendEmail(process.env.SUPER_ADMIN_EMAIL, 'New Admin Request', `A new admin request has been submitted by ${user.name} (${user.email})`);

    res.status(201).json({ message: 'Admin request submitted successfully. Await approval.',request:adminRequest} );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.cancelAdminRequest = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find the user's pending admin request
    const existingRequest = await AdminRequest.findOne({ userId, status: 'pending' });

    // If no pending request is found, return an error
    if (!existingRequest) {
      return res.status(400).json({ error: 'No pending admin request found to cancel.' });
    }
console.log(existingRequest.status,"cancel")
        existingRequest.status="cancel"
          await existingRequest.save()
    // Cancel the pending admin request (you can either delete or mark it as cancelled)
    await AdminRequest.findByIdAndDelete(existingRequest._id);

    // Optionally, send an email to the Super Admin about the cancellation
    await sendEmail(
      process.env.SUPER_ADMIN_EMAIL,
      'Admin Request Cancelled',
      `The admin request from ${req.user.name} (${req.user.email}) has been cancelled.`
    );

    res.status(200).json({ message: 'Your admin request has been cancelled successfully.' ,request:existingRequest});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } 
};

  //profile

  exports.getProfile = async (req, res) => {
    const userId = req.query.userId || req.body.userId;
   console.log(userId,"profile id")
    try {
      const user = await User.findById(userId).select('-password -otp -otpExpires');
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  exports.veryfyProfile = async (req, res) => {
    const userId = req.user.id;
    const { email, password } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
      await sendEmail(user.email, 'OTP for Login', `Your OTP is: ${otp}`);

      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 12);
  
      await user.save();
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  exports.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { email, password } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }


      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 12);
  
      await user.save();
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };


// Get order history for the logged-in user
exports.getOrderHistory = async (req, res) => {
  try {
    // Find orders for the logged-in user
    const orders = await Order.find({ userId: req.user.id }).populate('items.itemId', 'name price');
    console.log(orders)
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.ItemDetails = async (req, res) => {
  const itemId = req.query.itemId || req.body.itemId;
  try {
    // Find orders for the logged-in user
    const item = await CanteenItem.find({_id:itemId}).select("-adminId")
    
    if (!item || item.length === 0) {
      return res.status(200).json({ message: 'No item found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.createOrder = async (req, res) => {
  const { userId,amount,order_Id,payment_Id, items } = req.body;

  try {
    console.log(items)
    let totalPrice = 0;
    // Calculate the total price of the order
    for (let i = 0; i < items.length; i++) {
      const item = await CanteenItem.findById({_id:items[i].itemId});
      if (!item) {
        return res.status(404).json({ success: false, message: `Item ${items[i].itemId} not found` });
      }
      totalPrice += item.price * items[i].quantity;
    }

    // Create a new order
    const order = new Order({
      userId,
      items,
      totalPrice,
      amount,
      order_Id,
      payment_Id, 
      status: 'pending', // Initially pending, can be updated by admin later
      adminId: null,
    });

    await order.save();
    res.status(201).json({ success: true, message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating order', error });
  }
};

// Get user's order history
exports.getUserOrders = async (req, res) => { //this order will see canteen admin
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).populate('items.itemId');
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching orders', error });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Allow cancellation only if the order is pending
    if (order.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Only pending orders can be canceled' });
    }

    order.status = 'canceled';
    await order.save();

    res.status(200).json({ success: true, message: 'Order canceled successfully', order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error canceling order', error });
  }
};
exports.AllItemsUser = async (req, res) => {
  // const adminId=req.query.adminId || req.body.adminId;
  // console.log(adminId,"admin id")
    try {
      const item = await CanteenItem.find();
      // console.log(item,"item data",adminId)
  
      res.status(200).json({ message: 'Item get successfully',item });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }; 
