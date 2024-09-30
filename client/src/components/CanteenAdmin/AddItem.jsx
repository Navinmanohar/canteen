import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCanteenItem } from '../../redux/actions/canteenActions';
import Sidebar from '../sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';


 export const AddItem = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [imageFile, setImageFile] = useState(null);
const [newItem, setNewItem] = useState({
  name: '',
  price: '',
  cookingTime: '',
  description: '',
  day:''
});

// File input (image)


const handleFileChange = (e) => {
  setImageFile(e.target.files[0]);  // Store the image file separately
};

const handleAddItem = (e) => {
  e.preventDefault();

  // Create FormData object for submission
  if(newItem.cookingTime!=""&&newItem.price!=""&&newItem.name!=''&&newItem.description!=''&&imageFile!=null)
  {
    const formData = new FormData();
  formData.append('name', newItem.name);
  formData.append('price', newItem.price);
  formData.append('day', newItem.day);
  formData.append('cookingTime', newItem.cookingTime);
  formData.append('description', newItem.description);
  formData.append('image', imageFile);  // Append the file (image)
  

  // Dispatch the action to add the item
  // for (const value of formData.values()) {
  //   console.log(value,"dddddd");
  // }
  // console.log(formData,"this is form data",newItem.name)
  dispatch(addCanteenItem(formData));
  navigate("/canteen/view-item")
  }
  // Reset form after submission
  setNewItem({
    name: '',
    price: '',
    cookingTime: '',
    description: '',
    day:'',
  });
  setImageFile(null);
};
// console.log(newItem,"item")
  return (
    <div className=''>
      <Sidebar/>
    <div className='flex justify-center mb-5'>
    <form onSubmit={handleAddItem} className="mt-8 bg-white p-6 rounded-lg w-[30%] shadow-md">
            <h2 className="text-xl font-semibold">Add New Item</h2>
            {/* Add item form */}
            <div className="mb-4">
              <label className="block text-gray-700">Item Name <span className='text-red-500'>*</span></label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>
           
          
            <div className="mb-4">
              <label className="block text-gray-700">Price <span className='text-red-500'>*</span></label>
              <input
                type="number"
                className="border border-gray-300 p-2 w-full"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700">Day Available <span className='text-red-500'>*</span></label>
            <select
              className="border border-gray-300 p-2 w-full"
              value={newItem.day}
              onChange={(e) => setNewItem({ ...newItem, day: e.target.value })}
            >
              <option value="">Select a Day</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </div>
            <div className="mb-4">
              <label className="block text-gray-700">Cooking Time <span className='text-red-500'>*</span></label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full"
                value={newItem.cookingTime}
                onChange={(e) => setNewItem({ ...newItem, cookingTime: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description <span className='text-red-500'>*</span></label>
              <textarea
                className="border border-gray-300 p-2 w-full"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Item Image (Upload New) <span className='text-red-500'>*</span></label>
              <input
                type="file"
                className="border border-gray-300 p-2 w-full"
                onChange={handleFileChange}
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
    </div>
    </div>
  );
};
