import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order, OrderState } from "./type";
import { ThunkRejectValue } from "@redux/types";
import { handleAxiosError } from "../utils/handleThunkError";
import api from "../../../config/axios";

const initialState: OrderState = {
  order: null,
  isOrderLoading: false,
  orderError: null,
};

export const createOrder = createAsyncThunk<Order, Order, ThunkRejectValue>(
  "orders/createOrder",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("order/create", { ...payload });

      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isOrderLoading = false;
        state.orderError = null;
      })
      .addCase(createOrder.pending, (state) => {
        state.order = null;
        state.isOrderLoading = true;
        state.orderError = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.order = null;
        state.isOrderLoading = false;
        state.orderError = action.payload || "Failed to fetch order";
      });
  },
});

export default ordersSlice.reducer;
