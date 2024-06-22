import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder as apiCreateOrder } from "../../services/api";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { getState }) => {
    const state = getState();
    const userId = state.auth.user?.ID;
    const response = await apiCreateOrder({ ...orderData, user_id: userId });
    return response.data;
  }
);

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrders(state,action){
         state.orders = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.orders.push(action.payload); // Push the new order to the orders array
    });

    builder.addCase(createOrder.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export const { addOrders } = orderSlice.actions
export default orderSlice.reducer;
