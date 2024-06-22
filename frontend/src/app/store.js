import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import addOrders  from '../features/order/orderSlice';

export default configureStore({
  reducer: {
      auth: authReducer,
      cart: cartReducer,
      order: addOrders,
  },
});