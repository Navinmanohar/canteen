import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptOrder, cancelOrder, viewCanteenOrders } from '../../redux/actions/canteenActions';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const ViewOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.items);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState('');

  useEffect(() => {
    dispatch(viewCanteenOrders());
  }, [dispatch]);

  // Handle order acceptance
  const handleAcceptOrder = (orderId) => {
    dispatch(acceptOrder(orderId));
  };

  // Open cancel modal
  const handleCancelClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };

  // Handle order cancellation
  const handleCancelOrder = () => {
    if (cancelReason.trim()) {
      dispatch(cancelOrder(selectedOrderId, cancelReason));
      setShowCancelModal(false); // Close the modal after cancellation
      setCancelReason(''); // Reset the reason input
    } else {
      alert('Please provide a reason for cancellation');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
 <Sidebar/>
<div className="container mx-auto p-8 ml-64">
      <h2 className="text-3xl font-bold mb-4">Manage Orders</h2>
      {orders?.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders?.map((order) => (
            <div key={order._id} className="bg-white shadow-md mb-5 rounded-lg p-6">
              <div className="mb-2">
                <div>
                  <h3 className="text-xl font-semibold">Order ID: {order._id}</h3>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
                  <p className="text-gray-600">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <h1>Item ready in {order.readyBy}</h1>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Items:</h4>
                {order.items.map((item) => (
                  <div key={item._id} className="flex justify-between bg-gray-100 p-3 rounded-lg">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600">Price: ${item.price}</p>
                    </div>
                    <div>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Accept/Cancel Buttons */}
              <div className="mt-4 flex gap-4">
                {order.status === 'pending' && (
                  <>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => handleAcceptOrder(order._id)}
                    >
                      Accept Order
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleCancelClick(order._id)}
                    >
                      Cancel Order
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Cancel Order</h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Please provide a reason for cancellation"
            ></textarea>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleCancelOrder}
              >
                Confirm Cancel
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
    </div>
  );
};

export default ViewOrders;
