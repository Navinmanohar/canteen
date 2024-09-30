import {
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAIL,
  ITEM_FAIL,
  ITEM_REQUEST,
  ITEM_SUCCESS
} from '../constants/orderConstants';

const initialState = {
  orders: [],
  loading: false,
  error: null,
  item:[]
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_ORDERS_REQUEST:
    case ITEM_REQUEST:
      return { ...state, loading: true };

    case FETCH_USER_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };

    case ITEM_SUCCESS:
      return { ...state, loading: false, item: action.payload };

    case FETCH_USER_ORDERS_FAIL:
    case ITEM_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
