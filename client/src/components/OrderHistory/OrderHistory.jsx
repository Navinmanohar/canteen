import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistory } from '../../redux/actions/userActions'; // Import cancelOrder action
import {cancelOrder } from "../../redux/actions/canteenActions"

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { UserOrders, loading, error } = useSelector((state) => state.userData);
  const [countdowns, setCountdowns] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState('');

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  // Initialize countdown timers for each order based on the readyBy field
  useEffect(() => {
    if (UserOrders) {
      const newCountdowns = {};
      UserOrders.forEach((order) => {
        if (order.readyBy && order.status === 'accepted') {
          // Calculate the time remaining by subtracting the current time from readyBy
          const timeRemaining = order.readyBy - new Date().getTime();
          newCountdowns[order._id] = timeRemaining > 0 ? timeRemaining : 0;
        }
      });
      setCountdowns(newCountdowns);
    }
  }, [UserOrders]);

  // Update the countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prevState) => {
        const updatedCountdowns = {};
        Object.keys(prevState).forEach((orderId) => {
          if (prevState[orderId] > 0) {
            updatedCountdowns[orderId] = prevState[orderId] - 1000; // Decrement by 1 second
          } else {
            updatedCountdowns[orderId] = 0;
          }
        });
        return updatedCountdowns;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Function to open the cancel modal
  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    // console.log(orderId,"orderid in model")
    setShowCancelModal(true);
  };

  // Function to handle order cancellation with reason
  const handleCancelOrder = () => {
    if (cancelReason.trim()) {
      dispatch(cancelOrder(selectedOrderId, cancelReason)); // Dispatch the cancelOrder action
      setShowCancelModal(false); // Close the modal after cancellation
      setCancelReason(''); // Reset the reason input
    } else {
      alert('Please provide a reason for cancellation');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">Order History</h2>
      {UserOrders?.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {UserOrders?.map((order) => (
            <div key={order._id} className="bg-white shadow-md rounded-lg p-6">
              <div className="mb-2 flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Order ID: {order._id}</h3>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
                  <p className="text-gray-600">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  {/* Countdown Timer */}
                  {order.status === 'accepted' && order.readyBy && (
                    <div className="mt-0">
                      <p className="text-green-600">
                        Ready in: {countdowns[order._id] > 0 ? formatTime(countdowns[order._id]) : 'Ready!'}
                      </p>
                    </div>
                  )}
                  {order.status === 'canceled' && (
                    <div className="mt-0">
                      <p className=' rounded-sm p-4 bg-yellow-200 text-red-500 font-bold text-center mt-6'> Reason :: Due to {order.reason}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Items:</h4>
                {order?.items.map((item) => (
                  <div key={item._id} className="flex justify-between bg-gray-100 p-3 rounded-lg">
                    <div>
                      <p className="font-medium">{item.itemId.name}</p>
                      <p className="text-gray-600">Price: ${item.itemId.price}</p>
                    </div>
                    <div>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cancel Button */}
              {order.status === 'pending' && (
                <div className="mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => openCancelModal(order._id)}
                  >
                    Cancel Order
                  </button>
                </div>
              )}
              {order.status === 'canceled' && (
                <div className="mt-4">
                
                  <h2 className='bg-red-500 text-white text-2xl text-center rounded-sm'>Order cancel and refunded</h2>
                  
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Cancel Order</h2>
            <textarea
              placeholder="Please provide a reason for cancellation"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleCancelOrder}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setShowCancelModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
