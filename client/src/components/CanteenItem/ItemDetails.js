import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchItemDetails } from '../../redux/actions/orderActions';
import { updateBucketQuantity } from '../../redux/actions/BucketAction';

const ItemDetails = () => {
  const param = useParams(); // Retrieve item ID from URL
  const dispatch = useDispatch();
  const { item, loading, error } = useSelector((state) => state.orders);
  const { bucketItems } = useSelector((state) => state.bucket); // Get bucket items from state
  const [existsInBucket, setExistsInBucket] = useState(false); // Check if item exists in bucket
  const [feedback, setFeedback] = useState([]); // Array for feedback
  const [totalPurchases, setTotalPurchases] = useState(0); // Total number of purchases
  const navigate = useNavigate();

  const url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    dispatch(fetchItemDetails(param.id)); // Fetch item details based on the item ID
    // console.log(param, 'item id');
  }, [dispatch, param.id]);

  useEffect(() => {
    if (item) {
      // Simulate feedback and purchases; you may replace these with actual data from backend
      setFeedback(item.feedback || []);
      setTotalPurchases(item.totalPurchases || 0);
      // console.log(item, 'fetched item');
    }
  }, [item]);

  // Check if the item already exists in the bucket
  useEffect(() => {
    const itemExists = bucketItems.some((bucketItem) => bucketItem._id === item[0]?._id);
    setExistsInBucket(itemExists);
  }, [bucketItems, item]);

  const handleAddToBucket = () => {
    if (!existsInBucket) {
      dispatch(updateBucketQuantity(item[0], 1));
      setExistsInBucket(true); // Mark as added to bucket
    }
  };

  const handleGoToBucket = () => {
    navigate('/item/bucket');
  };

  const handleBuyNow = () => {
    dispatch(updateBucketQuantity(item[0], 1));
    navigate(`/checkout/${item[0]._id}`);
  };

  console.log(item, 'itemdetails');
  return (
    <div className="flex min-h-screen justify-center">
      <div className="p-8 w-[50%]">
        <h1 className="font-bold text-center text-xl mb-8">Item details</h1>
        {loading ? (
          <p>Loading item details...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          item && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={`${url}${item[0]?.imageUrl}` || '/assets/default-food.jpg'}
                alt={item[0]?.name}
                className="w-full h-fit object-cover"
              />
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">{item[0]?.name}</h1>
                <p className="text-gray-700 mb-2">
                  <strong>Price:</strong> ₹{item[0]?.price}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Cooking Time:</strong> {item[0]?.cookingTime} mins
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Description:</strong> {item[0]?.description}
                </p>

                {/* Display the appropriate button based on whether the item is already in the bucket */}
                {existsInBucket ? (
                  <button
                    onClick={handleGoToBucket}
                    className="bg-yellow-800 text-white px-8 py-2 mr-[22%] rounded hover:bg-yellow-900 md:float-right md:mt-[-40px]"
                  >
                    Go to Bucket
                  </button>
                ) : (
                  <button
                    onClick={handleAddToBucket}
                    className="bg-yellow-800 text-white px-8 py-2 md:mr-[30%]  rounded hover:bg-yellow-900 md:float-right md:mt-[-40px] "
                  >
                    Add to Bucket
                  </button>
                )}

                <button
                  onClick={handleBuyNow}
                  className="bg-yellow-800 text-white px-8 py-2 rounded mt-5 hover:bg-yellow-900 md:float-right md:mt-[-40px]"
                >
                  Buy Now
                </button>

                {/* Feedback Section */}
                <div className="mt-8">
                  <hr className="border border-b-4 border-b-slate-500"></hr>
                  <h2 className="text-2xl font-bold mb-4 mt-3">Feedback</h2>
                  {feedback.length > 0 ? (
                    feedback.map((fb, index) => (
                      <div key={index} className="mb-4">
                        <p className="text-gray-700">
                          <strong>User:</strong> {fb.user}
                        </p>
                        <p className="text-gray-600">
                          <strong>Comment:</strong> {fb.comment}
                        </p>
                        <p className="text-gray-600">
                          <strong>Rating:</strong> {fb.rating} / 5
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No feedback available for this item yet.</p>
                  )}
                </div>

                {/* Total Purchases */}
                <div className="mt-6">
                  <h2 className="text-2xl font-bold mb-4">Number of Purchases</h2>
                  <p className="text-gray-700">
                    <strong>Total Purchases:</strong> {totalPurchases}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
