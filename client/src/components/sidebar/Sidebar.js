import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'; // Import icons for toggle

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(true); // State to toggle sidebar

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const renderSuperAdminLinks = () => (
    <>
      <li>
        <Link to="/admin/manage-users" className="text-white hover:bg-gray-700 p-2 rounded">
          Manage Users
        </Link>
      </li>
      <li>
        <Link to="/admin/manage-admins" className="text-white hover:bg-gray-700 p-2 rounded">
          Manage Admins
        </Link>
      </li>
      <li>
        <Link to="/admin/admin-requests" className="text-white hover:bg-gray-700 p-2 rounded">
          Admin Request
        </Link>
      </li>
      <li>
        <Link to="/admin/analytics" className="text-white hover:bg-gray-700 p-2 rounded">
          View Analytics
        </Link>
      </li>
    </>
  );

  const renderCanteenAdminLinks = () => (
    <>
    <li>
        <Link to="/canteen/view-orders" className="text-white hover:bg-gray-700 p-2 rounded">
          View Orders
        </Link>
      </li>
      <li>
        <Link to="/canteen/manage-items" className="text-white hover:bg-gray-700 p-2 rounded">
          Manage Items
        </Link>
      </li>
      
      <li>
        <Link to="/canteen/transactions" className="text-white hover:bg-gray-700 p-2 rounded">
          View Transactions
        </Link>
      </li>
    </>
  );

  return (
    <div className="flex">
      {/* Toggle Button */}
      <div
        className={`h-screen fixed bg-gray-800 text-white flex flex-col transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex justify-between items-center p-4">
          {isOpen && <h2 className="text-2xl font-bold">Admin Dashboard</h2>}
          <button onClick={toggleSidebar} className="text-white focus:outline-none">
            {isOpen ? <FiArrowLeft size={24} /> : <FiArrowRight size={24} />}
          </button>
        </div>
        <ul className={`space-y-4 ${isOpen ? 'p-4' : 'p-2'}`}>
          {userInfo?.userData?.user.isSuperAdmin && renderSuperAdminLinks()}
          {userInfo?.userData?.user.isAdmin && renderCanteenAdminLinks()}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
