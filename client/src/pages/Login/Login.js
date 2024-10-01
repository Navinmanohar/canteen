import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authAction';
import { Link, useNavigate } from 'react-router-dom';
import LoadingComponent from '../../components/Loading/Loading';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [user,setUser]=useState(false)
  const { loading, error, userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password)); // Dispatch login action
  };
   
  useEffect(() => {
    // If userInfo is available, navigate based on their role
    if (userInfo) {
      if (userInfo?.userData?.user?.isSuperAdmin) {
        navigate('/admin'); // Super Admin dashboard
      } else if (userInfo?.userData?.user?.isAdmin) {
        navigate('/canteen-admin'); // Canteen Admin dashboard
      } else {
        navigate('/'); // Regular user homepage
      }
    }
  }, [userInfo, navigate]);

  return (
    <div className="container mx-auto p-8">
      
      {loading ? <div className='w-screen h-screen'>
        <h2 className='text-center font-bold'>Please wait! i am conneting to the canteen...</h2>
        <LoadingComponent/>
        </div>:
      <div><h1 className="text-3xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
    
      
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="border border-gray-300 p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="border border-gray-300 p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <p className="text-blue-500 mt-4">
          <Link to="/register">Don't have an account? Register here</Link>
        </p>
        {/* Add Reset Password Option */}
        <p className="text-blue-500 mt-2">
          <Link to="/reset-password">Forgot Password?</Link>
        </p>
      </form>
      </div>}
    </div>
  );
};

export default Login;
