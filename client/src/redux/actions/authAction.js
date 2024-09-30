import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_VERIFY_OTP_REQUEST,
  USER_VERIFY_OTP_SUCCESS,
  USER_VERIFY_OTP_FAIL,
  USER_OTP_REQUEST,
  USER_LOGOUT,USER_OTP_FAIL,USER_OTP_SUCCESS,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_REQUEST,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  
} from '../constants/userConstants';

const BASE_URL = "https://canteen-1-t0lk.onrender.com";

// User login
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`${BASE_URL}/api/auth/login`, { email, password }, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.error : error.message,
    });
  }
};

// User registration
export const registerUser = (name,phone,email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`${BASE_URL}/api/auth/register`, { name,phone,email, password }, config);
      //  console.log(data ,"this is redux")
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    // console.log(error ,"this is redux error")
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response : error.message,
    });
  }
};

// Verify OTP
export const verifyOTP = (email,otp) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_VERIFY_OTP_REQUEST });

    const { userInfo } = getState().user;
    // console.log(userInfo ,"this otp info" ,"otp",otp)
    // const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };
// const user=JSON.parse(localStorage.getItem("userInfo"))
// const email=user?.userData?.user?.email

    const { data } = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {email, otp });
    dispatch({ type: USER_VERIFY_OTP_SUCCESS, payload: data });

    const getuserInfo = JSON.parse(localStorage.getItem('userInfo'));
    const updatedUserInfo = { ...getuserInfo, isActive: true }; // Update the 'isActive' status
    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
  } catch (error) {
    dispatch({
      type: USER_VERIFY_OTP_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};


export const logoutUser = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem("userRequest")
};


export const otpSend = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_OTP_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`${BASE_URL}/api/auth/otp`, { email }, config);
      //  console.log(data ,"this is redux")
    dispatch({ type: USER_OTP_SUCCESS, payload: data });
  } catch (error) {
    // console.log(error ,"this is redux error")
    dispatch({
      type: USER_OTP_FAIL,
      payload: error.response && error.response.data.message ? error.response : error.message,
    });
  }
};
export const requestPasswordReset = (email) => async (dispatch) => {
  try {
    dispatch({ type: PASSWORD_RESET_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post(`${BASE_URL}/api/auth/request-reset-password `, { email }, config);

    dispatch({ type: PASSWORD_RESET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Reset Password (Step 2: Verify OTP and Reset Password)
export const resetPassword = (email, otp, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: PASSWORD_RESET_CONFIRM_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
  //  console.log(email,otp ,"and ",newPassword)
    const { data } = await axios.post(`${BASE_URL}/api/auth/reset-password`, { email, otp, newPassword }, config);

    dispatch({ type: PASSWORD_RESET_CONFIRM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};



