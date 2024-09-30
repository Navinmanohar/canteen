import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, resetSuccess } = useSelector((state) => state.user);
const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email, otp, newPassword));
  };
  if (resetSuccess) {
    navigate('/login'); // Redirect to the login page after password reset
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Verify OTP & Reset Password</h1>
      {error && <p className="text-red-500">{error}</p>}
      {resetSuccess && <p className="text-green-500">Password reset successfully</p>}
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
        <div className="mb-4">
          <label className="block text-gray-700">OTP</label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className="border border-gray-300 p-2 w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Resetting Password...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
