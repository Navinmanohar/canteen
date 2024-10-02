import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, verifyOTP } from '../../redux/actions/authAction';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingComponent from '../../components/Loading/Loading';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [exist, setExist] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false); // Controls OTP step visibility
  const [isVerified, setIsVerified] = useState(false); // Track OTP verification success

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, otpVerificationSuccess,registration } = useSelector((state) => state.user); // Track OTP success separately

  // Handle form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const isUserExist = await checkUser();

    if (isUserExist) {
      setIsOtpSent(false);
      navigate("/login");
    } else {
      dispatch(registerUser(name, phone, email, password));
      setIsOtpSent(true); // Move to OTP screen after registration
      setEmail(email)
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = (e) => {

    dispatch(verifyOTP(email,otp));
   if(otpVerificationSuccess)
     navigate("/")
  };

  // Function to check if the user already exists
  const checkUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/check', { email });
      if (response.data.exists) {
        setExist(true);
        return true;
      } else {
        setExist(false);
        return false;
      }
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
  };

  // Redirect to home only after OTP is successfully verified
  useEffect(() => {
    if (otpVerificationSuccess) {
      setIsVerified(true); // OTP is verified
      navigate('/'); // Redirect after OTP verification
    }
  }, [otpVerificationSuccess, isOtpSent, error, navigate]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500">{error.error}</p>}
      {!isOtpSent ? (
        <form onSubmit={handleRegisterSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact Details <span className="text-red-500">*</span></label>
            <input
              type="number"
              maxLength={12}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            {exist && <p className="text-red-500 mt-1">User already exists with this email</p>}
            <label className="block text-gray-700">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className='flex'>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${exist ? 'cursor-not-allowed' : ''}`}
              disabled={loading || exist}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
            <p className='text-blue-500 ml-[2rem] mt-2'><Link to="/login">If you have an account, login here</Link></p>
          </div>
        </form>
      ) : (!error&&
        <form onSubmit={handleOtpSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">OTP <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;
