import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAdmin, revokeUser } from '../../redux/actions/adminActions'; // Assume this action fetches all users

function AdminManage() {
  const dispatch = useDispatch();
  const { admins, loading, error } = useSelector((state) => state.admin); // Fetch users from the store
  const [selectedUser, setSelectedUser] = useState(null); // State to hold the selected user

  useEffect(() => {
    dispatch(fetchAllAdmin()); // Fetch users when the component loads
  }, []);
const handleRevokeAdmin=(id)=>{
  dispatch(revokeUser(id))
  dispatch(fetchAllAdmin());
}
  const handleUserClick = (admin) => {
    setSelectedUser(admin); // Set the clicked user to display more details
  };


  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main content should have margin to the left to avoid overlapping with sidebar */}
      <div className="ml-64 p-8 flex-grow">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Admins</h1>

        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : admins && admins.length > 0 ? (
          <div className="flex">
            {/* List of users */}
            <div className="w-1/3 pr-4">
              <ul className="space-y-4">
                {admins?.map((user) =>
                  (
                    <li
                      key={user._id}
                      onClick={() => handleUserClick(user)}
                      className="bg-gray-200 p-4 rounded w-64 cursor-pointer hover:bg-gray-300"
                    >
                      <p className="font-bold">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* User details section */}
            <div className="w-2/3 ml-10 pl-4">
              {selectedUser ? (
                <div className="bg-orange-400 h-64 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-4">User Details</h2>
                  <p>
                    <strong>Name:</strong> {selectedUser.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedUser.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedUser.phone}
                  </p>
                  <p>
                    <strong>Role:</strong> {selectedUser.isAdmin ? 'Admin' : 'User'}
                  </p>
                  <button
                            className="bg-red-500 mt-5 text-white px-8 py-2 rounded ml-0 hover:bg-green-600 transition duration-300"
                            onClick={() => handleRevokeAdmin(selectedUser._id)}
                          >
                            Revoke Admin access
                          </button>
                       
                </div>
              ) : (
                <p>Select a user to see details.</p>
              )}
            </div>
          </div>
        ) :<p className='items-center text-center text-red-400 font-bold'>No admin</p>}
      </div>
    </div>
  );
}

export default AdminManage;
