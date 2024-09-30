import axios from 'axios';
import {
  ADMIN_MANAGE_APPLICATION_REQUEST,
  ADMIN_MANAGE_APPLICATION_SUCCESS,
  ADMIN_MANAGE_APPLICATION_FAIL,
  ADMIN_USER_LIST_REQUEST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAIL,
  ADMIN_REVOKE_USER_REQUEST,
  ADMIN_REVOKE_USER_SUCCESS,
  ADMIN_REVOKE_USER_FAIL,
  ADMIN_USER_DETAILS_REQUEST,
  ADMIN_USER_DETAILS_SUCCESS,
  ADMIN_USER_DETAILS_FAIL,
  ADMIN_REQUESTS_REQUEST,
  ADMIN_REQUESTS_SUCCESS,
  ADMIN_REQUESTS_FAIL,
  ADMIN_LIST_FAIL,ADMIN_LIST_SUCCESS,
  ADMIN_LIST_REQUEST,
} from '../constants/adminConstants';

const BASE_URL = "http://localhost:5000";

// Manage application
export const manageApplication = (userId,action) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_MANAGE_APPLICATION_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.post(`${BASE_URL}/api/admin/manage-application`,{userId,action}, config);
    dispatch({ type: ADMIN_MANAGE_APPLICATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_MANAGE_APPLICATION_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Fetch all users
export const fetchAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_LIST_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.get(`${BASE_URL}/api/admin/users`, config);
     console.log(data,"from admin")
    dispatch({ type: ADMIN_USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const fetchAllAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_LIST_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.get(`${BASE_URL}/api/admin/all-admin`, config);
     console.log(data,"from admin")
    dispatch({ type: ADMIN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Revoke user
export const revokeUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_REVOKE_USER_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.post(`${BASE_URL}/api/admin/revoke`,{userId}, config);
    dispatch({ type: ADMIN_REVOKE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_REVOKE_USER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Fetch specific user details
export const fetchUserDetails = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_DETAILS_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.get(`${BASE_URL}/api/admin/user/${userId}`, config);
    dispatch({ type: ADMIN_USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Admin requests
export const fetchAdminRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_REQUESTS_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.get(`${BASE_URL}/api/admin/admin-requests`, config);
    dispatch({ type: ADMIN_REQUESTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_REQUESTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
