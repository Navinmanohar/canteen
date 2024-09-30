import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetails, fetchOrderHistory, applyForAdmin, cancelRequest } from '../../redux/actions/userActions';
import { Link, useNavigate } from 'react-router-dom';
import { otpSend, verifyOTP } from '../../redux/actions/authAction';

const Profile = () => {
  const dispatch = useDispatch();
  const [isSendOtp, setIsSendOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const { userInfo, loading, error } = useSelector((state) => state.user);
  const {UserOrders,userProfile} = useSelector((state) => state.userData);
  // const { orders } = useSelector((state) => state.orders);
  const navigate = useNavigate();
const request=JSON.parse(localStorage.getItem("userRequest"))
// console.log(request,"request")


  useEffect(() => {
    // console.log(userInfo?.userData,"this is profile")
    // dispatch(getProfileDetails(userInfo?.userData?.user._id));
  if(userInfo)
      {
        dispatch(fetchOrderHistory());
      dispatch(getProfileDetails(userInfo?.userData?.user._id));
      }
     
  }, [dispatch,userInfo]);

  console.log(userProfile,"userData profile")
 const handleApplyAdmin=()=>{
  dispatch(applyForAdmin(userInfo?.userData?.user?._id))
 }
 const handleCancelAdmin=()=>{
  dispatch(cancelRequest(userInfo?.userData?.user?._id))
 }
  const verifyOtp = (e) => {
    e.preventDefault();
    const localData =JSON.parse(localStorage.getItem("useInfo"));
    // console.log(userInfo,"this email of profile")
    try {
      dispatch(verifyOTP(otp));
      setIsSendOtp(false);
      navigate(`/profile/${userInfo?.userData?.user._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const AccountActive = (email) => {
    dispatch(otpSend(email));
    setIsSendOtp(true);
  };

  // Role-specific content based on the user's role
  const renderRoleContent = () => {
    if (userProfile.isSuperAdmin) {
      return (
        <div className="bg-green-200 p-4 rounded-lg">
          <p className="text-green-800">Welcome, Super Admin!</p>
          <p>You have full access to manage users, canteens, and orders.</p>
        </div>
      );
    } else if (userInfo?.userData?.user.isAdmin) {
      return (
        <div className="bg-yellow-200 p-4 rounded-lg">
          <p className="text-yellow-800">Welcome, Canteen Admin!</p>
          <p>You can manage canteen items, view orders, and process transactions.</p>
        </div>
      );
    } else {
      return (
        <div className="bg-blue-200 p-4 rounded-lg">
          <p className="text-blue-800">Welcome, User!</p>
          <p>You can browse the canteen menu and place orders.</p>
          <div className='flex gap-1'>
          {!userInfo?.userData?.isAdmin==true?<button className="mt-4 bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-700" onClick={handleApplyAdmin}>
            Apply for Admin
          </button>
          :<button className="mt-4 bg-red-300 text-white px-2 py-2 rounded hover:bg-red-700" onClick={handleCancelAdmin}>
          Cancel Request
        </button>}
          </div>
        </div>
      );
    }
  };

  const otpRender = () => {
    return (
      <form onSubmit={verifyOtp} className="bg-white p-6 rounded-lg shadow-md">
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
    );
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      {isSendOtp ? (
        otpRender()
      ) : (
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <p>Name: {userInfo?.userData?.user.name}</p>
          <p className={userInfo?.userData?.user.status !== "active" ? "text-red-400" : ""}>
            Email: {userInfo?.userData?.user.email}{' '}
            <span>
              {userInfo?.userData?.user.status !== "active" ? (
                <button
                  className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => AccountActive(userInfo?.userData?.user.email)}
                >
                  Activate
                </button>
              ) : null}
            </span>
          </p>
          <p>Phone: {userInfo?.userData?.user.phone}</p>
        </div>
      )}

      {renderRoleContent()}

      {!userInfo?.userData?.user.isSuperAdmin && !userInfo?.userData?.user.isAdmin && (
        <div className="mt-8">
          <Link to={`/orders/${userInfo?.userData?.user._id}`} className="text-blue-500">View Orders</Link>
        </div>
      )}

      <div>
        <Link to="/logout" className="text-red-400">Log Out</Link>
      </div>
    </div>
  );
};


export default Profile;
