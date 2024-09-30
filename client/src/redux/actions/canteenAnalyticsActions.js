import axios from 'axios';
import {
  CANTEEN_ANALYTICS_REQUEST,
  CANTEEN_ANALYTICS_SUCCESS,
  CANTEEN_ANALYTICS_FAIL,
} from '../constants/canteenConstants';

const BASE_URL = "http://localhost:5000";

// Fetch canteen analytics data
export const fetchCanteenAnalytics = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CANTEEN_ANALYTICS_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.get(`${BASE_URL}/api/canteen/orders/analytics`, config);
    dispatch({ type: CANTEEN_ANALYTICS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CANTEEN_ANALYTICS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
