import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset } from '../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  
  // Ensure navigate is called correctly
  const navigate = useNavigate();  // Add parentheses to invoke useNavigate correctly

  // Get the relevant state values from Redux
  const { loading, error, success } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestPasswordReset(email)); // Dispatch the action to request password reset
  };

  if (success === true) {
    navigate('/otp-verify'); // Redirect to the OTP verification page after success
    console.log("Redirecting to OTP verification...");
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>

      {/* Display error or success messages */}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">OTP has been sent to your email</p>}
      
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="border border-gray-300 p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
