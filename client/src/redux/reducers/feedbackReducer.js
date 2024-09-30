import {
    FEEDBACK_SUBMIT_REQUEST,
    FEEDBACK_SUBMIT_SUCCESS,
    FEEDBACK_SUBMIT_FAIL,
    FEEDBACK_FETCH_REQUEST,
    FEEDBACK_FETCH_SUCCESS,
    FEEDBACK_FETCH_FAIL,
  } from '../constants/feedbackConstants';
  
  export const feedbackReducer = (state = { feedbacks: [] }, action) => {
    switch (action.type) {
      case FEEDBACK_SUBMIT_REQUEST:
      case FEEDBACK_FETCH_REQUEST:
        return { ...state, loading: true };
  
      case FEEDBACK_SUBMIT_SUCCESS:
        return { ...state, loading: false, feedbacks: [...state.feedbacks, action.payload] };
  
      case FEEDBACK_FETCH_SUCCESS:
        return { ...state, loading: false, feedbacks: action.payload };
  
      case FEEDBACK_SUBMIT_FAIL:
      case FEEDBACK_FETCH_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  