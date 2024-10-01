import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // To extract order ID from URL
import { acceptOrder, cancelOrder, fetchOrderDetailsById } from '../../redux/actions/canteenActions';
import LoadingComponent from '../Loading/Loading';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams(); // Get orderId from the route parameters
  const { orderDetails, loading, error ,message } = useSelector((state) => state.items); // Assuming you have orderDetails in your reducer

  useEffect(() => {
    dispatch(fetchOrderDetailsById(orderId)); // Fetch the order details when the component loads
  }, [dispatch, orderId]);

  const handleAcceptOrder = (orderId) => {
    dispatch(acceptOrder(orderId));
    // dispatch(not)
  };

  // Function to handle canceling an order
  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
  };


  if (loading) {
    return <LoadingComponent/>;
  }
  // console.log(orderDetails,"details")

  // if (error) {
  //   return <p className="text-red-500">{error}</p>;
  // }

  return (
    <div className="container mx-auto p-8">
      {error??<p className="text-red-500">{message.message}</p>}
      <h2 className="text-3xl font-bold mb-4">Order Details</h2>

      {orderDetails && (
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Order Information */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Order ID: {orderDetails._id}</h3>
            <p className="text-gray-600">Status: {orderDetails.status}</p>
            <p className="text-gray-600">Total Price: ${orderDetails.totalPrice}</p>
            <p className="text-gray-600">Order Date: {new Date(orderDetails.createdAt).toLocaleString()}</p>
          </div>

          {/* Items in the Order */}
          <h4 className="font-semibold text-xl mb-4">Items Ordered:</h4>
          <div className="space-y-4">
            {orderDetails.items.map((item) => (
              <div key={item._id} className="bg-gray-100 p-4 rounded-lg flex items-center justify-between space-x-4">
                {/* Image of the Item */}
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${item.itemId.imageUrl}`} // Assuming imageUrl is available in item
                  alt={item.itemId.name}
                  className="w-fit h-20 object-cover rounded"
                />

                {/* Item Details */}
                <div className='m-auto'>
                  <h5 className="text-lg font-semibold">{item.itemId.name}</h5>
                  <p className="text-gray-600">Price: ${item.itemId.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>

                {/* Total for Each Item */}
                <div className="ml-auto float-right">
                  <p className="text-gray-800 font-semibold">
                   Item Total: ${(item.itemId.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price and Status */}
          <div className="mt-6">
            <h4 className="text-lg font-bold">Total Price: ${orderDetails.totalPrice}</h4>
            <p className={`text-sm ${orderDetails.status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
              Status: {orderDetails.status}
            </p>
            <div className="mt-4 flex gap-4">
                {orderDetails.status === 'pending' && (
                  <>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => handleAcceptOrder(orderDetails._id)}
                    >
                      Accept Order
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleCancelOrder(orderDetails._id)}
                    >
                      Cancel Order
                    </button>
                  </>
                )}
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
