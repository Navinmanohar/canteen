const Order = require('../model/CanteenOrder');
const sendEmail = require('../utils/emailService');
const Razorpay = require('razorpay');
const Payment = require('../model/Payment');
const User = require('../model/user');
// View all orders (filter by time or first-come, first-serve)
exports.viewOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    // Sort orders: Pending (highest priority), Canceled, then Accepted
    const sortedOrders = orders.sort((a, b) => {
     
      const statusOrder = { 'pending': 0, 'canceled': 1, 'accepted': 2 };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }

      // If statuses are the same, sort by createdAt (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.status(200).json(sortedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } 
};

// Accept an order
exports.acceptOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Find the order and update its status to "accepted"
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: 'accepted' },
      { new: true }
    ).populate('userId', 'email name');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    // Calculate the estimated ready time based on the maximum cooking time of the items
    const maxCookingTime = Math.max(...order.items.map(item => item.cookingTime));

    // Calculate the "readyBy" time based on the current time + max cooking time
    const readyBy = new Date();
    readyBy.setMinutes(readyBy.getMinutes() + maxCookingTime);

    // Update the order status to "accepted" and store the readyBy time
    order.status = 'accepted';
    order.readyBy = readyBy;

    await order.save(); // Save the updated order

    // Send email notification to user
    const emailMessage = `
      Hi ${order.userId.name},
      Your order has been accepted! We'll start preparing it soon and estimated time taking for preparing is ${readyBy} after that you can pickup your order.
      Order ID: ${order._id}
    `;

    await sendEmail(order.userId.email,'Your order has been accepted!',emailMessage,);

    return res.status(200).json({ message: 'Order accepted and notification sent.', order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Cancel an order
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Cancel Order and Process Refund
exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body; // Receive orderId and reason from frontend

    // Find the order by its ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check if the order has a valid payment ID for refund
    if (!order.payment_Id) {
      return res.status(400).json({ success: false, message: 'Order does not have a valid payment ID for a refund' });
    }

    // Find the payment entry related to this order
    const transaction = await Payment.findOne({ order_id: order.order_Id });
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    // If the payment is already refunded, don't process again
    if (transaction.status === 'refunded') {
      return res.status(400).json({
        success: false,
        message: 'The payment has been fully refunded already',
      });
    }

    // Call Razorpay's refund API to process the refund
    const refund = await razorpayInstance.payments.refund(order.payment_Id, {
      amount: order.totalPrice * 100, // Refund the total amount in paise (100 paise = 1 INR)
      notes: {
        reason: reason || 'Refund for canceled order',
      },
      receipt: `Receipt for order ${orderId}`,
      speed: 'normal', // Default speed can be 'normal', 'optimum', or 'instant'
    });

    // Update the transaction status to 'refunded'
    transaction.status = 'refunded';
    transaction.refundDetails = {
      refundId: refund.id,
      amount: refund.amount / 100, // Store in INR instead of paise
      status: refund.status,
      created_at: refund.created_at,
      reason: reason,
    };
    await transaction.save();

    // Update the order status to 'canceled'
    order.status = 'canceled';
    order.reason=reason;
    await order.save();

    // Fetch the user and send a cancellation email
    const user = await User.findById(order.userId);
    const emailMessage = `
      Hi ${user.name},
      Unfortunately, your order has been canceled due to: ${reason}.
      A refund has been processed successfully.
      Order ID: ${orderId}
    `;

    await sendEmail(user.email, 'Your order has been canceled!', emailMessage);

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Order canceled and refund processed successfully',
      refund,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error processing refund', error });
  }
};

  
  // Notify the user when the order is ready
  exports.notifyUser = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      const order = await Order.findById(orderId).populate('userId');
      // console.log(order)
      if (!order || order?.adminId?.toString() !== req.user.id) {
        return res.status(404).json({ error: 'Order not found or unauthorized' });
      }
  
      // Send email notification
      await sendEmail(order.userId.email, 'Your order is ready', 'Your order is ready for pickup.');
  
      // Optionally send an in-app notification (depends on your frontend setup)
      res.status(200).json({ message: 'User notified successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  exports.getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId).populate('items.itemId'); // Populate to get item details
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  