import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromBucket } from '../../redux/actions/BucketAction';
import axios from 'axios';

const Checkout = () => {
  const { bucketItems } = useSelector((state) => state.bucket); // Get all items in the bucket (cart)
  const { userInfo } = useSelector((state) => state.user); // Get user information
  const [orderId, setOrderId] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Calculate the total price of all items in the bucket
    const calculateTotal = () => {
      const total = bucketItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
      setTotalPrice(total);
    };
    calculateTotal();
  }, [bucketItems]);

  // Load the Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadRazorpayScript(); // Load Razorpay script when the component mounts
  }, []);

  // Handle the Razorpay Payment Process
  const handlePayment = async () => {
    if (!userInfo) {
      alert("Please log in to proceed with payment.");
      navigate('/login');
      return;
    }

    setIsProcessing(true); // Disable the button while processing

    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      setIsProcessing(false); // Re-enable the button
      return;
    }

    try {
      // Create an order on the backend
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/create-order`, {
        amount: totalPrice, // Razorpay expects amount in paisa (INR)
        currency: "INR",
        userId: userInfo?.userData?.user._id,
      });
console.log(data,"data from backend")
      setOrderId(data.order.id); // Save orderId for the payment process

      const options = {
        key: "rzp_test_ZAHC2tyV82AQ64", // Replace with your Razorpay key ID
        amount: data.amount,
        currency: 'INR',
        name: 'Canteen',
        description: 'Basket Payment',
        order_id: data.order.id, // Razorpay order ID
        handler: async (response) => {
          console.log(response,"response")
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId:userInfo.userData.user._id,
            amount:totalPrice * 100,
          };
          console.log('Payment Data: ', paymentData);
          // Verify payment on the backend
          const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/verify-payment`, paymentData);

          if (result.data.success) {
            alert('Payment Successful!');
            const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };
            // Store the order and payment details in the database
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/orders`, {
              items: bucketItems.map((item) => ({
                itemId: item._id,
                quantity: item.quantity,
                price: item.price,
                name: item.name,
                imageUrl: item.imageUrl,
                cookingTime:item.cookingTime,
              })),
              payment_Id: response.razorpay_payment_id,
              order_Id: response.razorpay_order_id,
              userId: userInfo.userData.user._id,
              amount: totalPrice * 100,
            },config);
            // Clear the bucket (cart) after successful payment
            bucketItems.forEach(item => dispatch(removeFromBucket(item._id)));
            navigate(`/profile/${userInfo.userData.user._id}`); // Redirect to user profile or order history page
          } else {
            alert('Payment failed, please try again.');
          }
        },
        prefill: {
          name: userInfo.userData.user.name,
          email: userInfo.userData.user.email,  // Fixed typo: "emai" to "email"
          contact: userInfo.userData.user.phone,
        },
        theme: {
          color: '#F37254',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Error during payment process:", error);
      alert("Failed to create an order. Please try again.");
    }

    setIsProcessing(false); // Re-enable the button after processing
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      {bucketItems.length === 0 ? (
        <p>Your bucket is empty!</p>
      ) : (
        <>
          <ul>
            {bucketItems.map((item) => (
              <li key={item._id} className="flex justify-between items-center mb-4 p-4 bg-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src={`${process.env.REACT_APP_BASE_URL}${item.imageUrl}`} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h2 className="text-xl">{item.name}</h2>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right mt-4">
            <h2 className="text-2xl font-bold">Total: ₹{totalPrice}</h2>
            <button
              onClick={handlePayment}
              className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay Now ₹${totalPrice}`}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
