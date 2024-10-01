import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/sidebar/Sidebar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addCanteenItem, deleteCanteenItem, fetchAllItems, updateCanteenItem } from '../../../redux/actions/canteenActions';

const CanteenAdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const {allItem} =useSelector((state)=>state.items)
  const [editingItem, setEditingItem] = useState(null);
  const dispatch=useDispatch()
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    cookingTime: '',
    description: '',
    imageUrl: null,
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
       dispatch(fetchAllItems())
        setItems(allItem);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', newItem.name);
    formData.append('price', newItem.price);
    formData.append('cookingTime', newItem.cookingTime);
    formData.append('description', newItem.description);
    formData.append('imageUrl', newItem.imageUrl);

    try {
      dispatch(addCanteenItem(formData))
      alert('Item added successfully!');
      setNewItem({ name: '', price: '', cookingTime: '', description: '', imageUrl: null });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item._id);
    setNewItem({
      name: item.name,
      price: item.price,
      cookingTime: item.cookingTime,
      description: item.description,
      imageUrl: null, // Image needs to be uploaded again
    });
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', newItem.name);
    formData.append('price', newItem.price);
    formData.append('cookingTime', newItem.cookingTime);
    formData.append('description', newItem.description);
    if (newItem.imageUrl) formData.append('imageUrl', newItem.imageUrl);

    try {
       dispatch(updateCanteenItem(editingItem,formData))
      setEditingItem(null);
      setNewItem({ name: '', price: '', cookingTime: '', description: '', imageUrl: null });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      dispatch(deleteCanteenItem(itemId))
      setItems(items.filter(item => item._id !== itemId));
      alert('Item deleted');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar isAdmin={false} />
      <div className=" p-8 flex-grow  ml-64">
        <h1 className="text-3xl font-bold text-center">Canteen Admin Dashboard</h1>

        {editingItem ? (
          <form onSubmit={handleUpdateItem} className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Edit Item</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Item Name</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-[30%]"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                className="border border-gray-300 p-2 w-full"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Cooking Time</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full"
                value={newItem.cookingTime}
                onChange={(e) => setNewItem({ ...newItem, cookingTime: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                className="border border-gray-300 p-2 w-full"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Item Image (Upload New)</label>
              <input
                type="file"
                className="border border-gray-300 p-2 w-full"
                onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.files[0] })}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Item
            </button>
          </form>
        ) : (
          <form onSubmit={handleAddItem} className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Add New Item</h2>
            {/* Add item form */}
            <div className="mb-4">
              <label className="block text-gray-700">Item Name</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>
           
          
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                className="border border-gray-300 p-2 w-full"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Cooking Time</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full"
                value={newItem.cookingTime}
                onChange={(e) => setNewItem({ ...newItem, cookingTime: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                className="border border-gray-300 p-2 w-full"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Item Image (Upload New)</label>
              <input
                type="file"
                className="border border-gray-300 p-2 w-full"
                onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.files[0] })}
              />
            </div>
        
         
            {/* Add remaining form fields */}
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Item
            </button>
          </form>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Canteen Items</h2>
          {loading ? (
            <loading/>
          ) : (
            <table className="min-w-full mt-8">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">${item.price}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => handleEditItem(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2"
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CanteenAdminDashboard;
