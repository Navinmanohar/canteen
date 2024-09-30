import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const { loading, error, userInfo } = useSelector((state) => state.user);
  // console.log(JSON.parse(localStorage.getItem("userInfo")), "this is local");
  // console.log(userInfo?.userData?.user, "this is nav ");

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl">Canteen</Link>
        <div className="flex space-x-4">
          {userInfo?.userData?.user?.name ? (
            <Link
              to={`/profile/${userInfo?.userData?.user._id}`}
              className="text-white block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
            >
              {`Hello, ${userInfo?.userData?.user.name}`}
            </Link>
          ) : (
            <Link to="/register" className="text-white">Register</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
