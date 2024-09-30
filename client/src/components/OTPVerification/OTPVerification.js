import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyOTP } from '../../redux/actions/userActions';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOTP(otp));
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Verify OTP</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Enter OTP</label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default OTPVerification;
