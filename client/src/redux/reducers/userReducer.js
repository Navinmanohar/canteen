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
    CANCEL_ADMIN_SUCCESS,
    CANCEL_ADMIN_FAIL,
    USER_ORDER_HISTORY_SUCCESS,
    CANTEEN_ITEM_USER_FAIL,CANTEEN_ITEM_USER_SUCCESS, CANTEEN_ITEM_USER_REQUEST
  } from '../constants/userConstants';
  
  const initialState = {
    UserOrders:[],
    userProfile: {},
    adminApplication: {},
    loading: false,
    error: null,
    allItem:[]
  };
  
  export const userDataReducer = (state = initialState, action) => {
    // console.log(action.payload,"action type",action.type,"this is action type")
    switch (action.type) {
      case GET_ORDER_HISTORY_REQUEST:
      case APPLY_ADMIN_REQUEST:
      case APPLY_ADMIN_REQUEST:
      case GET_PROFILE_REQUEST:
      case VERIFY_PROFILE_OTP_REQUEST:
      case CANTEEN_ITEM_USER_REQUEST:
        return { ...state, loading: true };
  
      case APPLY_ADMIN_SUCCESS:
      case CANCEL_ADMIN_SUCCESS:
        return { ...state, loading: false, adminApplication: action.payload };
  
      case GET_PROFILE_SUCCESS:
      
        return { ...state, loading: false, userProfile: action.payload };
      case CANTEEN_ITEM_USER_SUCCESS:
      
        return { ...state, loading: false, allItem: action.payload };
  
      case VERIFY_PROFILE_OTP_SUCCESS:
        return { ...state, loading: false, otpVerified: true };
        case USER_ORDER_HISTORY_SUCCESS:
          // console.log('Updating UserOrders:', action.payload);
          return {
            ...state,
            loading: false,
            UserOrders: action.payload,
          };
  
  
      case GET_ORDER_HISTORY_FAIL:
      case APPLY_ADMIN_FAIL:
      case GET_PROFILE_FAIL:
      case CANCEL_ADMIN_FAIL:  
      case VERIFY_PROFILE_OTP_FAIL:
      case CANTEEN_ITEM_USER_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;


    }
  };
  