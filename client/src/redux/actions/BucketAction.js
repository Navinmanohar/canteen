export const updateBucketQuantity = (item, qty) => (dispatch, getState) => {
  try {
    const { bucketItems } = getState().bucket;
    
    // Find the item in the bucket with the same _id
    const findItem = bucketItems.find((x) => x._id === item._id);

    if (findItem) {
      // If the item already exists, update the quantity
      const updatedItem = {
        ...findItem,
        quantity: findItem.quantity + qty, // Increment the existing quantity
      };

      dispatch({
        type: 'BUCKET_UPDATE_ITEM',
        payload: updatedItem,
      });

    } else {
      // If the item doesn't exist, add it to the bucket
      const newItem = {
        ...item,
        quantity: qty, // Set initial quantity
      };

      dispatch({
        type: 'BUCKET_ADD_ITEM',
        payload: newItem,
      });
    }

    // Update localStorage after adding/updating the bucket
    localStorage.setItem('bucketItems', JSON.stringify(getState().bucket.bucketItems));
  } catch (err) {
    dispatch({
      type: 'ADD_ITEM_FAIL',
      payload: err.response?.data?.message || 'Error adding item to bucket',
    });
  }
};

  export const removeFromBucket = (item) => (dispatch, getState) => {
    console.log(item,"remove")
    dispatch({
      type: 'BUCKET_REMOVE_ITEM',
      payload: item,
    });
  
    localStorage.removeItem('bucketItems')
  };
  