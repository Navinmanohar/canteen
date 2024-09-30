import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAIL,
  } from "../constants/orderConstants";
  
  // Initial state for orders
  const initialState = {
    loading: false,
    order: null,
    orders: [],
    error: null,
  };
  
  // Place Order Reducer
  export const placeOrderReducer = (state = initialState, action) => {
    switch (action.type) {
      case PLACE_ORDER_REQUEST:
        return { ...state, loading: true };
      case PLACE_ORDER_SUCCESS:
        return { ...state, loading: false, order: action.payload };
      case PLACE_ORDER_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Get Order Reducer
  export const getOrderReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ORDER_REQUEST:
        return { ...state, loading: true };
      case GET_ORDER_SUCCESS:
        return { ...state, loading: false, orders: action.payload };
      case GET_ORDER_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Cancel Order Reducer
  export const cancelOrderReducer = (state = initialState, action) => {
    switch (action.type) {
      case CANCEL_ORDER_REQUEST:
        return { ...state, loading: true };
      case CANCEL_ORDER_SUCCESS:
        return { ...state, loading: false, order: action.payload };
      case CANCEL_ORDER_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  