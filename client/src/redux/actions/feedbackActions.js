import axios from 'axios';
import {
  FEEDBACK_SUBMIT_REQUEST,
  FEEDBACK_SUBMIT_SUCCESS,
  FEEDBACK_SUBMIT_FAIL,
  FEEDBACK_FETCH_REQUEST,
  FEEDBACK_FETCH_SUCCESS,
  FEEDBACK_FETCH_FAIL,
} from '../constants/feedbackConstants';

const BASE_URL = "https://canteen-1-t0lk.onrender.com";

// Submit feedback for an item
export const submitFeedback = (itemId, feedbackData) => async (dispatch, getState) => {
  try {
    dispatch({ type: FEEDBACK_SUBMIT_REQUEST });

    const { userInfo } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${BASE_URL}/api/feedback/${itemId}`, feedbackData, config);
    dispatch({ type: FEEDBACK_SUBMIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FEEDBACK_SUBMIT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Fetch feedback for an item
export const fetchFeedback = (itemId) => async (dispatch, getState) => {
  try {
    dispatch({ type: FEEDBACK_FETCH_REQUEST });

    const { userInfo } = getState().user;
    const config = { headers: { Authorization: `Bearer ${userInfo.userData.token}` } };

    const { data } = await axios.get(`${BASE_URL}/api/feedback/${itemId}`, config);
    dispatch({ type: FEEDBACK_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FEEDBACK_FETCH_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
