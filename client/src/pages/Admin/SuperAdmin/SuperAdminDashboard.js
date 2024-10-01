import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/sidebar/Sidebar';
import { fetchAllUsers, manageApplication, revokeUser } from '../../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading/Loading';

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const[userState,setSate]=useState(false)
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [userState]);

  const handleApproveAdmin = async (userId) => {
    // Logic to approve the admin
    dispatch(manageApplication(userId,"approve"))
    setSate((state)=>!state)
  };
  const handleDenyAdmin = async (userId) => {
    // Logic to approve the admin
    dispatch(manageApplication(userId,"deny"))
    setSate((state)=>!state)
  };
  const handleRevokeAdmin=(userId)=>{
    dispatch(revokeUser(userId,"deny"))
    setSate((state)=>!state)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with fixed width */}
      <Sidebar isAdmin={true} />

      {/* Main content should have a margin-left matching the sidebar width */}
      <div className="ml-64 p-8 flex-grow">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Super Admin Dashboard</h1>

        {loading ? (
          <Loading/>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {users?.map((user) => (
                  !user.isSuperAdmin && (
                    <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.isAdmin ? 'Admin' : 'User'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {!user.isAdmin? (
                          <div>
                            <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                            onClick={() => handleApproveAdmin(user._id)}
                          >
                            Approve Admin
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded ml-4 hover:bg-green-600 transition duration-300"
                            onClick={() => handleDenyAdmin(user._id)}
                          >
                            Deny
                          </button>
                          </div>
                        ):<button
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                        onClick={() => handleRevokeAdmin(user._id)}
                      >
                        Revoke access
                      </button>}
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
