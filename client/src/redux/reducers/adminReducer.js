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

const initialState = {
  adminApplications: [],
  users: [],
  admins:[],
  selectedUser: null,
  adminRequests: [],
  loading: false,
  error: null,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_MANAGE_APPLICATION_REQUEST:
    case ADMIN_USER_LIST_REQUEST:
    case ADMIN_REVOKE_USER_REQUEST:
    case ADMIN_USER_DETAILS_REQUEST:
    case ADMIN_REQUESTS_REQUEST:
    case ADMIN_LIST_REQUEST:
      return { ...state, loading: true };

    case ADMIN_MANAGE_APPLICATION_SUCCESS:
      return { ...state, loading: false, adminApplications: action.payload };

    case ADMIN_USER_LIST_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case ADMIN_LIST_SUCCESS:
      return { ...state, loading: false, admins: action.payload };

    case ADMIN_REVOKE_USER_SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case ADMIN_USER_DETAILS_SUCCESS:
      return { ...state, loading: false, selectedUser: action.payload };

    case ADMIN_REQUESTS_SUCCESS:
      return { ...state, loading: false, adminRequests: action.payload };

    case ADMIN_MANAGE_APPLICATION_FAIL:
    case ADMIN_USER_LIST_FAIL:
    case ADMIN_REVOKE_USER_FAIL:
    case ADMIN_USER_DETAILS_FAIL:
    case ADMIN_REQUESTS_FAIL:
    case ADMIN_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
