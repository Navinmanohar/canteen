import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCanteenItem, fetchAllItems } from '../../redux/actions/canteenActions';
import Sidebar from '../sidebar/Sidebar';

export const DeleteItem = () => {
  const dispatch = useDispatch();
  const { allItem, loading, error } = useSelector((state) => state.items);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllItems()); // Fetch canteen items when the component loads
  }, [dispatch]);

  const handleDeleteItem = (itemId) => {
    setSelectedItemId(itemId);
    setConfirmDelete(true); // Ask for confirmation before deletion
  };

  const confirmDeletion = () => {
    if (selectedItemId) {
      dispatch(deleteCanteenItem(selectedItemId));
      dispatch(fetchAllItems())
      setConfirmDelete(false);
      setSelectedItemId(null);
    }
  };

  const cancelDeletion = () => {
    setConfirmDelete(false);
    setSelectedItemId(null);
  };
  const apiUrl = process.env.REACT_APP_BASE_URL;
  // const apiKey = process.env.REACT_APP_API_KEY;
  
  // console.log(apiUrl,allItem.item[0].imageUrl);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-64 p-8 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Delete Canteen Items</h2>

        {loading ? (
          <p>Loading items...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* List of canteen items */}
            {allItem?.item?.length > 0 ? (
              allItem?.item?.map((item) => (
                <div
                  key={item._id}
                  className="bg-white sm:w-[90%] md:w-[70%] shadow-md rounded-lg overflow-hidden transform transition-all hover:scale-105 duration-300"
                >
                  <img
                    src={`${apiUrl}${item.imageUrl}` || '/assets/default-food.jpg'} // Use item image or fallback
                    alt={item.name}
                    className="h-fit z-0 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-1"><strong>Price:</strong> ${item.price}</p>
                    <p className="text-gray-600 mb-1"><strong>Cooking Time:</strong> {item.cookingTime} mins</p>
                    {/* <p className="text-gray-600 mb-4 break-words ">{item.description}</p> */}
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-red-500 w-full">No items found for deletion.</p>
            )}
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this item?</h3>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={confirmDeletion}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={cancelDeletion}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
