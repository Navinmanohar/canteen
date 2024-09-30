import {
  CANTEEN_ADD_ITEM_REQUEST,
  CANTEEN_ADD_ITEM_SUCCESS,
  CANTEEN_ADD_ITEM_FAIL,
  CANTEEN_UPDATE_ITEM_REQUEST,
  CANTEEN_UPDATE_ITEM_SUCCESS,
  CANTEEN_UPDATE_ITEM_FAIL,
  CANTEEN_DELETE_ITEM_REQUEST,
  CANTEEN_DELETE_ITEM_SUCCESS,
  CANTEEN_DELETE_ITEM_FAIL,
  CANTEEN_VIEW_ORDERS_REQUEST,
  CANTEEN_VIEW_ORDERS_SUCCESS,
  CANTEEN_VIEW_ORDERS_FAIL,
  CANTEEN_ACCEPT_ORDER_REQUEST,
  CANTEEN_ACCEPT_ORDER_SUCCESS,
  CANTEEN_ACCEPT_ORDER_FAIL,
  CANTEEN_CANCEL_ORDER_REQUEST,
  CANTEEN_CANCEL_ORDER_SUCCESS,
  CANTEEN_CANCEL_ORDER_FAIL,
  CANTEEN_VIEW_TRANSACTIONS_REQUEST,
  CANTEEN_VIEW_TRANSACTIONS_SUCCESS,
  CANTEEN_VIEW_TRANSACTIONS_FAIL,
  CANTEEN_ITEM_FAIL,
  CANTEEN_ITEM_REQUEST,
  CANTEEN_ITEM_SUCCESS,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAIL,
  CANTEEN_NOTIFY_ORDER_FAIL,
  CANTEEN_NOTIFY_ORDER_SUCCESS,
  CANTEEN_NOTIFY_ORDER_REQUEST
} from '../constants/canteenConstants';

const initialState = {
  items: [],
  orders: [],
  transactions: [],
  loading: false,
  error: null,
  allItem:[],
  orderDetails: null,
  message:"",
  acceptance:""
};

export const canteenReducer = (state = initialState, action) => {
  console.log(action?.payload,"from canteeen")
  switch (action.type) {
    case CANTEEN_ADD_ITEM_REQUEST:
    case CANTEEN_UPDATE_ITEM_REQUEST:
    case CANTEEN_DELETE_ITEM_REQUEST:
    case CANTEEN_VIEW_ORDERS_REQUEST:
    case CANTEEN_ACCEPT_ORDER_REQUEST:
    case CANTEEN_CANCEL_ORDER_REQUEST:
    case CANTEEN_VIEW_TRANSACTIONS_REQUEST:
    case CANTEEN_ITEM_REQUEST:
      case GET_ORDER_DETAILS_REQUEST:
      case CANTEEN_NOTIFY_ORDER_REQUEST:
      return { ...state, loading: true };

    case CANTEEN_ADD_ITEM_SUCCESS:
      return { ...state, loading: false, items: [...state.items, action.payload] };

    case CANTEEN_ITEM_SUCCESS:
      return { ...state, loading: false, allItem:action.payload };

      case GET_ORDER_DETAILS_SUCCESS:
        return { ...state, loading: false, orderDetails: action.payload };

    case CANTEEN_UPDATE_ITEM_SUCCESS:
      return { ...state, loading: false, items: state.items.map(item => item.id === action.payload.id ? action.payload : item) };

    case CANTEEN_DELETE_ITEM_SUCCESS:
      return { ...state, loading: false, items: state.items.filter(item => item.id !== action.payload.id) };

    case CANTEEN_VIEW_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };

    case CANTEEN_ACCEPT_ORDER_SUCCESS:
      return { ...state, loading: false, message: action.payload,acceptance:true };
    case CANTEEN_CANCEL_ORDER_SUCCESS:
      return { ...state, loading: false, message: action.payload,acceptance:false };

    case CANTEEN_NOTIFY_ORDER_SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case CANTEEN_VIEW_TRANSACTIONS_SUCCESS:
      return { ...state, loading: false, transactions: action.payload };

    case CANTEEN_ADD_ITEM_FAIL:
    case CANTEEN_UPDATE_ITEM_FAIL:
    case CANTEEN_DELETE_ITEM_FAIL:
    case CANTEEN_VIEW_ORDERS_FAIL:
    case CANTEEN_ACCEPT_ORDER_FAIL:
    case CANTEEN_CANCEL_ORDER_FAIL:
    case CANTEEN_VIEW_TRANSACTIONS_FAIL:
    case CANTEEN_ITEM_FAIL:
      case GET_ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload,mesaage:action.payload };

    default:
      return state;
  }
};
