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
  USER_LOGOUT,
  USER_OTP_REQUEST,
  USER_OTP_SUCCESS,
  USER_OTP_FAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_REQUEST,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
} from '../constants/userConstants';

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo"))??null,
  loading: false,
  error: null,
  otpVerificationSuccess:false,
  registration:false,
  message:"",
  success:false,
  resetSuccess:false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_OTP_REQUEST:
    case PASSWORD_RESET_CONFIRM_REQUEST:
    case PASSWORD_RESET_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_VERIFY_OTP_REQUEST:
      return { ...state, loading: true,error:true };

     case USER_VERIFY_OTP_SUCCESS: 
     return {...state,loading:false,error:false,message:action.payload.message,otpVerificationSuccess:true,userInfo: action.payload}

    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false,error:false, userInfo: action.payload,message:action.payload.message };
    case USER_REGISTER_SUCCESS:
        return { ...state, loading: false,error:false,registration:true,message:action.payload.message};
    case USER_LOGOUT:  // Handle logout
      return { userInfo: null };

    case PASSWORD_RESET_SUCCESS:
        return { loading: false, success: true, message: action.payload.message }

    case PASSWORD_RESET_CONFIRM_SUCCESS:
          return { loading: false, resetSuccess: true, message: action.payload };

    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case USER_OTP_FAIL:
    case USER_VERIFY_OTP_FAIL:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};



