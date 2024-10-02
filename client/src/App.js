import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import AdminDashboard from './pages/Admin/SuperAdmin/SuperAdminDashboard';
import CanteenAdminDashboard from './pages/Admin/CanteenAdmin/CanteenAdminDashboard';
import Navbar from './components/Navbar/Navbar';
import Logout from './pages/Login/Logout';
import Users from './components/Admin/Users';
import AdminManage from './components/Admin/AdminManage';
import Footer from './components/Footer/Footer';
import UserRequest from './components/Admin/UserRequest';
import { AddItem } from './components/CanteenAdmin/AddItem';
import { UpdateItem } from './components/CanteenAdmin/UpdateItem';
import { DeleteItem } from './components/CanteenAdmin/DeleteItem';
import ManageItem from './components/CanteenAdmin/ManageItem';
import ItemDetails from './components/CanteenItem/ItemDetails';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'; // Import the PrivateRoute component
import ResetPassword from './pages/Login/ResetPassword';
import VerifyOtp from './pages/Login/VerifyOtp';
import Bucket from './components/Bucket/Bucket';
import Checkout from './pages/Checkout/Checkout';
import OrderHistory from './components/OrderHistory/OrderHistory';
import { useSelector } from 'react-redux';
import ViewOrders from './components/ViewOrder/ViewOrder';
import OrderDetails from './components/ViewOrder/OrderDetails';
import ViewTransactions from './components/Transaction/ViewTransactions';
import ViewAnalytics from './components/ViewAnalytics/ViewAnalytics';
import ViewCanteenItems from './components/CanteenAdmin/ViewCanteenItems';


function App() {
  const {userInfo}=useSelector((state)=>state.user)
  // const userType=userInfo?.userData.user.isAdmin
  // const SuperAdmin=userInfo?.userData.user.isSuperAdmin
  const footerLinks = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
    { name: 'Contact', url: '/contact' },
  ];

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/item/description/:id" element={<ItemDetails />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp-verify" element={<VerifyOtp />} />
        <Route path="/checkout/:itemid" element={<Checkout/>} />
        <Route path="/item/bucket" element={<Bucket />} />
        <Route path="/orders/:userId" element={<OrderHistory />} />

        {/* Admin Routes - Protected */}
        <Route
          path="/admin"
          element={
            // <PrivateRoute requiredRole={SuperAdmin?"superadmin":"user"}>
              <AdminDashboard />
            // </PrivateRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            // <PrivateRoute requiredRole={SuperAdmin?"superadmin":"user"}>
              <ViewAnalytics />
            // </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            // <PrivateRoute requiredRole={SuperAdmin?"superadmin":"user"}>
              <Users />
            // </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-admins"
          element={
            // <PrivateRoute requiredRole={SuperAdmin?"superadmin":"user"}>
              <AdminManage />
            // </PrivateRoute>
          }
        />
        <Route
          path="/admin/admin-requests"
          element={
            // <PrivateRoute requiredRole={SuperAdmin?"superadmin":"user"}>
              <UserRequest />
            // </PrivateRoute>
          }
        />

        {/* Canteen Admin Routes - Protected */}
        <Route
          path="/canteen-admin"
          element={
            // <PrivateRoute requiredRole={userType?"admin":"user"}>
              <ViewOrders />
            // </PrivateRoute>
          }
        />
        <Route
          path="/canteen/view-item"
          element={
            // <PrivateRoute requiredRole={userType?"admin":"user"}>
              <ViewCanteenItems />
            // </PrivateRoute>
          }
        />
        <Route
          path="/canteen/transactions"
          element={
            // <PrivateRoute requiredRole={userType?"admin":"user"}>
              <ViewTransactions />
            // </PrivateRoute>
          }
        />
        <Route
          path="/canteen/manage-items"
          element={
            // <PrivateRoute requiredRole={userType?"admin":"user"}>
              <ManageItem />
            // </PrivateRoute>
          }
        />
        <Route
          path="/canteen/manage-items/add"
          element={
            // <PrivateRoute requiredRole={userType?"admin":"user"}>
              <AddItem />
            // </PrivateRoute>
          }
        />
        <Route
          path="/canteen/manage-items/update"
          element={
            // <PrivateRoute requiredRole={userType?"admin":"user"}>
              <UpdateItem />
            // </PrivateRoute>
          }
        />

<Route path="/canteen/view-orders" element={<ViewOrders/>}/>
<Route path="/canteen/view-orders/:orderId" element={<OrderDetails/>}/>

        <Route
          path="/canteen/manage-items/delete"
          element={
            // <PrivateRoute requiredRole={userType?"admin":"user"}>
              <DeleteItem />
            // </PrivateRoute>
          }
        />
      </Routes>
      <Footer links={footerLinks} companyName="Canteen Pvt Ltd" year={2024} />
    </Router>
  );
}

export default App;
