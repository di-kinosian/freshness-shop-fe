import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order, OrderState } from "./type";
import { ThunkRejectValue } from "@redux/types";
import { handleAxiosError } from "../utils/handleThunkError";
import api from "../../../config/axios";
import { MESSAGES } from "../../../main/constants/messages";
import { cleanUpCart } from "../cart/cartSlice";

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

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        return thunkAPI.rejectWithValue(MESSAGES.ERROR.URL_ERROR);
      }

      return response.data.order;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const confirmOrder = createAsyncThunk<
  void,
  { sessionId: string; token: string },
  { rejectValue: string }
>("order/confirmOrder", async ({ sessionId, token }, thunkAPI) => {
  try {
    const response = await api.post(
      "/order/confirm",
      { sessionId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      thunkAPI.dispatch(cleanUpCart());
    } else {
      return thunkAPI.rejectWithValue("Order confirmation failed.");
    }
  } catch (error) {
    return handleAxiosError(error, thunkAPI);
  }
});

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
