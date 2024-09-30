import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// PrivateRoute component for protecting routes
const PrivateRoute = ({ children, requiredRole }) => {
  const { userInfo } = useSelector((state) => state.user);

  // If the user is not logged in, redirect to login page
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  // Check for required role (admin, super admin, etc.)
  if (requiredRole && userInfo?.userData?.user?.role !== requiredRole) {
    return <Navigate to="/" />; // Redirect to home or any other page
  }

  return children; // Render the protected route
};

export default PrivateRoute;
