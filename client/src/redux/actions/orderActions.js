import axios from 'axios';
import {
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAIL,
  ITEM_FAIL,
  ITEM_REQUEST,
  ITEM_SUCCESS,
PLACE_ORDER_REQUEST ,
PLACE_ORDER_SUCCESS,
PLACE_ORDER_FAIL,

 GET_ORDER_REQUEST ,
 GET_ORDER_SUCCESS ,
 GET_ORDER_FAIL ,

 CANCEL_ORDER_REQUEST,
CANCEL_ORDER_SUCCESS ,
 CANCEL_ORDER_FAIL ,
} from '../constants/orderConstants';

const BASE_URL = "http://localhost:5000";

// Fetch user orders
export const fetchUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_USER_ORDERS_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.get(`${BASE_URL}/api/orders`,{userId:userInfo.userData.user._id}, config);
    dispatch({ type: FETCH_USER_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_USER_ORDERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
}


export const fetchItemDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo?.userData?.token}` } };

    const { data } = await axios.get(`${BASE_URL}/api/user/item/?itemId=${id}`);
    // console.log(data,"from canteen")
    dispatch({ type: ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const placeOrder = (orderData) => async (dispatch,getState) => {
  try {
    dispatch({ type: PLACE_ORDER_REQUEST });
    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo?.userData.token}` } };
    const { data } = await axios.post(`${BASE_URL}/api/user/orders`, orderData,config);
    
    dispatch({
      type: PLACE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Get order by userId action
export const getOrder = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });
    
    const { data } = await axios.get(`${BASE_URL}/api/user/order/${userId}`);
    
    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Cancel order action
export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: CANCEL_ORDER_REQUEST });
    
    const { data } = await axios.put(`${BASE_URL}/api/user/order/cancel/${orderId}`);
    
    dispatch({
      type: CANCEL_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CANCEL_ORDER_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};