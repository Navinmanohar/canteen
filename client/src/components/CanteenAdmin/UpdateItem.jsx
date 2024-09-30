import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllItems, updateCanteenItem } from '../../redux/actions/canteenActions';
import Sidebar from '../sidebar/Sidebar';

export const UpdateItem = () => {
  const dispatch = useDispatch();
  const { allItem, loading, error } = useSelector((state) => state.items);
  const [imageFile, setImageFile] = useState(null);
  const [selectedItem, setSelectedItem] = useState({
    _id: '',
    name: '',
    price: '',
    cookingTime: '',
    description: '',
  });

  useEffect(() => {
    dispatch(fetchAllItems()); // Fetch canteen items when the component loads
  }, [dispatch]);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store the image file separately
  };

  const handleEditItem = (item) => {
    // Auto-fill the form fields with the selected item's data
    setSelectedItem(item);
    setImageFile(null); // Reset the imageFile field to prevent carrying over a previous file
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();

    // Create FormData object for submission
    const formData = new FormData();
    formData.append('name', selectedItem.name);
    formData.append('price', selectedItem.price);
    formData.append('cookingTime', selectedItem.cookingTime);
    formData.append('description', selectedItem.description);
    if (imageFile) {
      formData.append('image', imageFile); // Append the image file if updated
    }

    if (selectedItem._id) {
      dispatch(updateCanteenItem(selectedItem._id, formData));
      setSelectedItem({ _id: '', name: '', price: '', cookingTime: '', description: '' });
      setImageFile(null);
    }
  };

  const apiUrl = process.env.REACT_APP_BASE_URL;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-64 p-8 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Update Canteen Items</h2>

        {loading ? (
          <p>Loading items...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allItem?.item?.length > 0 ? (
              allItem?.item?.map((item) => (
                <div
                  key={item._id}
                  className="bg-white sm:w-[90%] md:w-[70%] shadow-md rounded-lg overflow-hidden transform transition-all hover:scale-105 duration-300"
                >
                  <img
                    src={`${apiUrl}${item.imageUrl}` || '/assets/default-food.jpg'}
                    alt={item.name}
                    className="h-fit z-0 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-1"><strong>Price:</strong> ${item.price}</p>
                    <p className="text-gray-600 mb-1"><strong>Cooking Time:</strong> {item.cookingTime} mins</p>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                      onClick={() => handleEditItem(item)} // Edit the item
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-red-500 w-full">No items found for updating.</p>
            )}
          </div>
        )}

        {/* Form for updating item */}
        {selectedItem._id && (
          <div className="flex justify-center mt-8">
            <form onSubmit={handleUpdateItem} className="bg-white p-6 rounded-lg w-[30%] shadow-md">
              <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Item Name</label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 w-full mb-4"
                  value={selectedItem.name}
                  onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  className="border border-gray-300 p-2 w-full mb-4"
                  value={selectedItem.price}
                  onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Cooking Time</label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 w-full mb-4"
                  value={selectedItem.cookingTime}
                  onChange={(e) => setSelectedItem({ ...selectedItem, cookingTime: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  className="border border-gray-300 p-2 w-full mb-4"
                  value={selectedItem.description}
                  onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Item Image (Upload New)</label>
                <input
                  type="file"
                  className="border border-gray-300 p-2 w-full mb-4"
                  onChange={handleFileChange}
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
