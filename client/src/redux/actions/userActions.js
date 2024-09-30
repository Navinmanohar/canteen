import axios from 'axios';
import {
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_FAIL,
  APPLY_ADMIN_REQUEST,
  APPLY_ADMIN_SUCCESS,
  APPLY_ADMIN_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  VERIFY_PROFILE_OTP_REQUEST,
  VERIFY_PROFILE_OTP_SUCCESS,
  VERIFY_PROFILE_OTP_FAIL,
  USER_ORDER_HISTORY_SUCCESS,
} from '../constants/userConstants';

const BASE_URL = "http://localhost:5000";

// Fetch order history
export const fetchOrderHistory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDER_HISTORY_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };
      //  console.log(config,"this is order")
    const { data } = await axios.get(`${BASE_URL}/api/user/order-history?userId=${userInfo.userData.user._id}`,config);
    
    console.log(data,"order action")
    dispatch({  type:USER_ORDER_HISTORY_SUCCESS,
      payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDER_HISTORY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Apply for admin
export const applyForAdmin = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPLY_ADMIN_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.post(`${BASE_URL}/api/user/apply-admin`, {userId}, config);
    console.log(data,"this apply")
    dispatch({ type: APPLY_ADMIN_SUCCESS, payload: data });
    localStorage.setItem("userRequest",JSON.stringify(data?.request))
  } catch (error) {
    dispatch({
      type: APPLY_ADMIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const cancelRequest = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPLY_ADMIN_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.post(`${BASE_URL}/api/user/cancel-admin`, {userId}, config);
    console.log(data,"this cancel")
    dispatch({ type: APPLY_ADMIN_SUCCESS, payload: data });
    localStorage.setItem("userRequest",JSON.stringify(data?.request))
  } catch (error) {
    dispatch({
      type: APPLY_ADMIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Get user profile
export const getProfileDetails = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });

    const { userInfo } = getState().user;
    // const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    const { data } = await axios.get(`${BASE_URL}/api/user/profile/?userId=${userInfo.userData.user._id}`);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Verify profile OTP
export const verifyProfileOTP = (otp) => async (dispatch, getState) => {
  try {
    dispatch({ type: VERIFY_PROFILE_OTP_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.post(`${BASE_URL}/api/user/verify-profile-otp`, { otp }, config);
    dispatch({ type: VERIFY_PROFILE_OTP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VERIFY_PROFILE_OTP_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};


