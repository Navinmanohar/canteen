import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBucket, updateBucketQuantity } from '../../redux/actions/BucketAction'
import { placeOrder } from '../../redux/actions/orderActions';
import { Link, useNavigate } from 'react-router-dom';
import emptyPlate from "../../assets/hunger.png"

const Bucket = () => {
  const dispatch = useDispatch();
  const { bucketItems } = useSelector((state) => state.bucket);
  const { userInfo } = useSelector((state) => state.user);
  const [totalPrice, setTotalPrice] = useState(0);
  const imgUrl=process.env.REACT_APP_BASE_URL
  const navigate=useNavigate()


  useEffect(() => {
    const calculateTotal = () => {
      const total = bucketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalPrice(total);
    };

    calculateTotal();
  }, [bucketItems]);

  const handleIncreaseQuantity = (itemId) => {
    dispatch(updateBucketQuantity(itemId, 1)); // Increase by 1
  };

  const handleDecreaseQuantity = (item) => {
    const newItem = bucketItems.find((item) => item._id === item._id);
    console.log(item,"incff")
    if (newItem.quantity > 1) {
      dispatch(updateBucketQuantity(item, -1)); // Decrease by 1, but not below 1
    }
    else {
      dispatch(removeFromBucket(item)); // Remove item if quantity is 1
    }
  };

  const handleRemoveItem = (item) => {
    console.log(item,"item buckte")
    dispatch(removeFromBucket(item));
  };

  const handlePlaceOrder = () => {
    // const items = bucketItems.map((item) => ({
    //   itemId: item._id,
    //   quantity: item.quantity,
    // }));
    // dispatch(placeOrder(items));
    navigate(`/checkout/${userInfo?.userData?.user._id}`)
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Your Bucket</h1>

      {bucketItems.length === 0 ? (
        <div className='text-center'>
          <p className='font-bold text-2xl mb-10'>Ooh! Your bucket is empty!</p>
          <Link to="/" className='text-blue-500 m-auto'>Please add something in your bucket <img src={emptyPlate} className='w-fit h-64 m-auto mt-2'/></Link>
        </div>
      ) : (
        <>
          <ul>
            {bucketItems.map((item) => (
              <li key={item._id} className="flex justify-between items-center mb-4 p-4 bg-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src={`${imgUrl}${item.imageUrl}`} alt={item.name} className="w-fit h-16 object-cover rounded" />
                  <div>
                    <h2 className="text-xl">{item.name}</h2>
                    <p>Price: ₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="text-right mt-4">
            <h2 className="text-2xl font-bold">Total: ₹{totalPrice}</h2>
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Bucket;
