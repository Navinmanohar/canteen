import axios from 'axios';
import {
  CANTEEN_ADD_ITEM_REQUEST,
  CANTEEN_ADD_ITEM_SUCCESS,
  CANTEEN_ADD_ITEM_FAIL,
  CANTEEN_UPDATE_ITEM_REQUEST,
  CANTEEN_UPDATE_ITEM_SUCCESS,
  CANTEEN_UPDATE_ITEM_FAIL,
  CANTEEN_DELETE_ITEM_REQUEST,
  CANTEEN_DELETE_ITEM_SUCCESS,
  CANTEEN_DELETE_ITEM_FAIL,
  CANTEEN_VIEW_ORDERS_REQUEST,
  CANTEEN_VIEW_ORDERS_SUCCESS,
  CANTEEN_VIEW_ORDERS_FAIL,
  CANTEEN_ACCEPT_ORDER_REQUEST,
  CANTEEN_ACCEPT_ORDER_SUCCESS,
  CANTEEN_ACCEPT_ORDER_FAIL,
  CANTEEN_CANCEL_ORDER_REQUEST,
  CANTEEN_CANCEL_ORDER_SUCCESS,
  CANTEEN_CANCEL_ORDER_FAIL,
  CANTEEN_VIEW_TRANSACTIONS_REQUEST,
  CANTEEN_VIEW_TRANSACTIONS_SUCCESS,
  CANTEEN_VIEW_TRANSACTIONS_FAIL,
  CANTEEN_ITEM_FAIL,
  CANTEEN_ITEM_REQUEST,
  CANTEEN_ITEM_SUCCESS,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAIL,
  CANTEEN_NOTIFY_ORDER_FAIL,
  CANTEEN_NOTIFY_ORDER_SUCCESS,
  CANTEEN_NOTIFY_ORDER_REQUEST

} from '../constants/canteenConstants';

const BASE_URL = "https://canteen-1-t0lk.onrender.com";

// Add a new item to the canteen
export const addCanteenItem = (itemData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANTEEN_ADD_ITEM_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: {
      Authorization: `Bearer ${userInfo.userData.token}`,
      'Content-Type': 'multipart/form-data', // Important for file uploads
    },
  };
// console.log(itemData,"from action data")
    const { data } = await axios.post(`${BASE_URL}/api/canteen/item-add`, itemData, config);
    // console.log(data,"from action")
    dispatch({ type: CANTEEN_ADD_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CANTEEN_ADD_ITEM_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Update an item
export const updateCanteenItem = (itemId, itemData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANTEEN_UPDATE_ITEM_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.put(`${BASE_URL}/api/canteen/item/update/${itemId}`, itemData, config);
    dispatch({ type: CANTEEN_UPDATE_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CANTEEN_UPDATE_ITEM_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Delete an item
export const deleteCanteenItem = (itemId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANTEEN_DELETE_ITEM_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.delete(`${BASE_URL}/api/canteen/item/delete/${itemId}`, config);
    dispatch({ type: CANTEEN_DELETE_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CANTEEN_DELETE_ITEM_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const fetchAllItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CANTEEN_ITEM_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.get(`${BASE_URL}/api/canteen/all-item/?adminId=${userInfo.userData.user._id}`,config);
    // console.log(data,"from canteen action")
    dispatch({ type: CANTEEN_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CANTEEN_ITEM_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};


// View all orders
export const viewCanteenOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CANTEEN_VIEW_ORDERS_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo?.userData.token}` } };

    const { data } = await axios.get(`${BASE_URL}/api/canteen/view-orders`, config);
    dispatch({ type: CANTEEN_VIEW_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CANTEEN_VIEW_ORDERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Accept an order
export const acceptOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANTEEN_ACCEPT_ORDER_REQUEST });

    const { userInfo } = getState().user;
     // Check if the token is available before making the request
     if (!userInfo || !userInfo.userData?.token) {
      throw new Error("Token not available");
    }
    // console.log(userInfo,"accept")
    const config = { headers: { Authorization: `Bearer ${userInfo?.userData?.token}` } };
    // console.log(userInfo,config,"accept")
    const { data } = await axios.post(`${BASE_URL}/api/canteen/order/accept/${orderId}`, config);
    dispatch({ type: CANTEEN_ACCEPT_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CANTEEN_ACCEPT_ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Cancel an order
export const cancelOrder = (orderId,reason) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANTEEN_CANCEL_ORDER_REQUEST });
  //  console.log(orderId ,"order id from action")
    const { userInfo } = getState().user;
     // Check if the token is available before making the request
     if (!userInfo || !userInfo.userData?.token) {
      throw new Error("Token not available");
    }
    const config = { headers: { Authorization: `Bearer ${userInfo?.userData.token}` } };

    const { data } = await axios.post(`${BASE_URL}/api/canteen/order/cancel/${orderId}`,{reason}, config);
    dispatch({ type: CANTEEN_CANCEL_ORDER_SUCCESS, payload: data }); 
  } catch (error) {
    dispatch({
      type: CANTEEN_CANCEL_ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const notifyOrder = (orderId,acceptance,time) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANTEEN_NOTIFY_ORDER_REQUEST });

    const { userInfo } = getState().user;
     // Check if the token is available before making the request
     if (!userInfo || !userInfo.userData?.token) {
      throw new Error("Token not available");
    }
    const config = { headers: { Authorization: `Bearer ${userInfo?.userData.token}` } };

    const { data } = await axios.post(`${BASE_URL}/api/canteen/order/cancel/${orderId}`,{acceptance}, config);
    dispatch({ type: CANTEEN_NOTIFY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CANTEEN_NOTIFY_ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// View transactions
export const viewTransactions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CANTEEN_VIEW_TRANSACTIONS_REQUEST });

    const { userInfo } =await getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.get(`${BASE_URL}/api/canteen/user/transactions`, config);
    dispatch({ type: CANTEEN_VIEW_TRANSACTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CANTEEN_VIEW_TRANSACTIONS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const fetchOrderDetailsById = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDER_DETAILS_REQUEST });

    const { userInfo } = getState().user; // Get user token from state
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.userData.token}`,
      },
    };

    // API call to fetch the order details by orderId
    const { data } = await axios.get(`${BASE_URL}/api/canteen/${orderId}`, config);

    dispatch({
      type: GET_ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};