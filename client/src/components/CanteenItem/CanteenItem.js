import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { updateBucketQuantity } from '../../redux/actions/BucketAction';

const CanteenItem = ({ item }) => {
  const dispatch = useDispatch();
  const { bucketItems } = useSelector((state) => state.bucket);
  const [existsInBucket, setExistsInBucket] = useState(false);
  const navigate = useNavigate();
  const imgUrl = process.env.REACT_APP_BASE_URL;

  const handleBuyNow = () => {
    if (!existsInBucket) {
      dispatch(updateBucketQuantity(item, 1));
      setExistsInBucket(true); // Mark as added to bucket
    }
    // dispatch(updateBucketQuantity(item, 1));
    navigate(`/checkout/${item._id}`);
  };

  const handleAddToBucket = () => {
    if (!existsInBucket) {
      dispatch(updateBucketQuantity(item, 1));
      setExistsInBucket(true); // Mark as added to bucket
    }
  };

  // Check if the item already exists in the bucket when the component mounts or bucketItems updates
  useEffect(() => {
    const itemExists = bucketItems.some((bucketItem) => bucketItem._id === item._id);
    setExistsInBucket(itemExists);
  }, [bucketItems, item._id]);

  return (
    <div className="mx-auto border p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-75 w-80">
      <Link to={`/item/description/${item._id}`}>
        <img src={`${imgUrl}${item.imageUrl}`} alt={item.name} className="h-fit object-cover" />
        <h2 className="text-lg font-bold mt-2">{item.name}</h2>
        <p className="text-gray-600">{item.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-900">${item.price}</span>

          {/* If item exists in the bucket, show "Go to Bucket" */}
          {existsInBucket ? (
            <Link to="/item/bucket" className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-900">
              Go to Bucket
            </Link>
          ) : (
            // Otherwise, show "Add to Bucket"
            <button
              onClick={handleAddToBucket}
              className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-900"
            >
              Add to Bucket
            </button>
          )}

          {/* Buy Now Button */}
          <Link to={`checkout/${item._id}`}>
            <button
              onClick={handleBuyNow}
              className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-900"
            >
              Buy
            </button>
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default CanteenItem;
