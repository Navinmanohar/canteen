import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
// import {  manageApplication } from '../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminRequests,manageApplication } from '../../redux/actions/adminActions';

const UserRequest = () => {
  const dispatch = useDispatch();
  const[userState,setSate]=useState(false)
  const { users, loading, error,adminRequests } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminRequests());
  }, [userState]);
// console.log(adminRequests[0]?.userId.name,"requests")
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with fixed width */}
      <Sidebar isAdmin={true} />

      {/* Main content should have a margin-left matching the sidebar width */}
      <div className="ml-64 p-8 flex-grow">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Super Admin Dashboard</h1>
          <h2 className='font-bold text-xl mb-3'>Admin Requests</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading users...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) :adminRequests.length>0? (
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
                {adminRequests?.map((admin,ind) => (
                  !admin.isSuperAdmin && (
                    <tr key={admin._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{admin?.userId.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{admin?.userId.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{admin.isAdmin ? 'Admin' : 'User'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {!admin.isAdmin? <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                            onClick={() => handleApproveAdmin(admin._id)}
                          >
                            Approve Admin
                          </button>:
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded ml-4 hover:bg-green-600 transition duration-300"
                            onClick={() => handleDenyAdmin(admin._id)}
                          >
                            Deny
                          </button>
                       
                        }
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        ):<p className='items-center text-center text-red-400 font-bold'>No admin Request</p>}
      </div>
    </div>
  );
};

export default UserRequest;
