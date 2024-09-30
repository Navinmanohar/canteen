const Order = require('../model/CanteenOrder');
const Payment = require('../model/Payment');

// Get analytics for the canteen admin

exports.getCanteenAnalytics = async (req, res) => {
  try {
    // Total sales
    const payments = await Payment.find();
    const totalSales = payments.reduce((sum, payment) => sum + payment.amount, 0);

    // Total orders
    const totalOrders = await Order.countDocuments();

    // Top selling items
    const topSellingItem = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.itemId',
          count: { $sum: '$items.quantity' },
        },
      },
      {
        $lookup: {
          from: 'canteenitems', // Replace 'canteenitems' with the actual collection name where item details are stored
          localField: '_id',    // The field from the "Order" collection (itemId)
          foreignField: '_id',  // The field from the "CanteenItem" collection (should be the _id of the item)
          as: 'itemDetails',
        },
      },
      { $unwind: '$itemDetails' }, // Unwind the array from lookup to get the single document
      { $sort: { count: -1 } },
      { $limit: 1 },
      {
        $project: {
          _id: 0, // Hide the _id field if you don't need it
          itemId: '$_id',
          itemName: '$itemDetails.name',  // Get the item's name from the lookup
          totalQuantitySold: '$count',
        },
      },
    ]);
    
    //popular item
    const popularItems = await Order.aggregate([
      { $match: { adminId: req.user.id, status: 'accepted' } },
      { $unwind: '$items' },
      { $group: { _id: '$items.itemId', totalQuantity: { $sum: '$items.quantity' } } },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 }
    ]);
    // Sales by Day
    const salesByDay = await Order.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' },
          totalSales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Order status breakdown
    const orderStatusBreakdown = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Recent orders
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      totalSales,
      totalOrders,
      topSellingItem: topSellingItem[0],
      salesByDay: salesByDay.reduce((obj, day) => ({ ...obj, [day._id]: day.totalSales }), {}),
      orderStatusBreakdown: orderStatusBreakdown.reduce((obj, status) => ({ ...obj, [status._id]: status.count }), {}),
      recentOrders,
      popularItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
