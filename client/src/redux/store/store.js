import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import {userReducer} from '../reducers/authReducer.js';
import {canteenReducer} from '../reducers/canteenReducer.js';
import {adminReducer} from '../reducers/adminReducer';
import { feedbackReducer } from '../reducers/feedbackReducer';
import { canteenAnalyticsReducer } from '../reducers/canteenAnalyticsReducer.js';
import { userDataReducer } from '../reducers/userReducer.js';
import { bucketReducer } from '../reducers/bucketReducer.js';
import { cancelOrderReducer, getOrderReducer, placeOrderReducer } from '../reducers/plceOrder.js';
import { orderReducer } from '../reducers/orderReducer.js.js';
// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  userData:userDataReducer,
  items: canteenReducer,
  orders:orderReducer,
  admin: adminReducer,
  feedback: feedbackReducer,
  analytics: canteenAnalyticsReducer, 
  bucket: bucketReducer,
  placeOrder: placeOrderReducer,
  getOrder: getOrderReducer,
  cancelOrder: cancelOrderReducer,
});

// Create store with Redux Thunk middleware
const store = createStore(
  rootReducer,
applyMiddleware(thunk)
);

export default store;
