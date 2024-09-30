import {
    CANTEEN_ANALYTICS_REQUEST,
    CANTEEN_ANALYTICS_SUCCESS,
    CANTEEN_ANALYTICS_FAIL,
  } from '../constants/canteenConstants';
  
  const initialState = {
    analyticsData: {},
    loading: false,
    error: null,
  };
  
  export const canteenAnalyticsReducer = (state = initialState, action) => {
    switch (action.type) {
      case CANTEEN_ANALYTICS_REQUEST:
        return { ...state, loading: true };
  
      case CANTEEN_ANALYTICS_SUCCESS:
        return { ...state, loading: false, analyticsData: action.payload };
  
      case CANTEEN_ANALYTICS_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  