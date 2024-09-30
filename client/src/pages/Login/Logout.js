import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/actions/authAction'; // Assuming logout action is defined in userActions

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch the logout action
    dispatch(logoutUser());

    // Clear localStorage
    localStorage.removeItem('userInfo');

    // Redirect to login page
    navigate('/');
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
