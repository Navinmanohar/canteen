import React from 'react';
import { AddItem } from './AddItem';
import { DeleteItem } from './DeleteItem';
import { UpdateItem } from './UpdateItem';
import { FiPlus, FiTrash, FiEdit } from 'react-icons/fi'; // Icons from react-icons library
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const ManageItem = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
    <div className="flex ml-64 flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Items</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        
        {/* Add Item Section */}
       <Link to='/canteen/manage-items/add'>
       <div className="bg-green-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FiPlus size={48} className="text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Add Item</h2>
        </div>
       </Link>

        {/* Update Item Section */}
        <Link to='/canteen/manage-items/update'>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FiEdit size={48} className="text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Update Item</h2>
        </div>
        </Link>

        {/* Delete Item Section */}
        <Link to='/canteen/manage-items/delete'>
        
        <div className="bg-red-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FiTrash size={48} className="text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Delete Item</h2>
        </div>
        </Link>

      </div>
    </div>
    </div>
  );
};

export default ManageItem;
