import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order, OrderState } from "./type";
import { ThunkRejectValue } from "@redux/types";
import { handleAxiosError } from "../utils/handleThunkError";
import api from "../../../config/axios";
import { MESSAGES } from "../../../main/constants/messages";
import { cleanUpCart } from "../cart/cartSlice";
import { selectAccessToken } from "../auth/selectors";
import { RootState } from "@redux/app/store";

const initialState: OrderState = {
  orders: [],
  order: null,
  isOrderLoading: false,
  orderError: null,
  confirmationOrder: null,
  confirmOrderError: null,
  isConfirmOrderLoading: false,
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

export const fetchOrders = createAsyncThunk<Order[], void, ThunkRejectValue>(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    const token = selectAccessToken(thunkAPI.getState() as RootState);

    try {
      const response = await api.get("order/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const confirmOrder = createAsyncThunk<
  Order,
  { sessionId: string },
  { rejectValue: string }
>("order/confirmOrder", async ({ sessionId }, thunkAPI) => {
  const token = selectAccessToken(thunkAPI.getState() as RootState);
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

    if (response.status === 201) {
      thunkAPI.dispatch(cleanUpCart());
      return response.data;
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
      })
      .addCase(confirmOrder.pending, (state) => {
        state.isConfirmOrderLoading = true;
        state.confirmOrderError = null;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.isConfirmOrderLoading = false;
        state.confirmationOrder = action.payload;
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.isConfirmOrderLoading = false;
        state.confirmOrderError = action.payload || "Failed to confirm order.";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isOrderLoading = false;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isOrderLoading = true;
      });
  },
});

export default ordersSlice.reducer;
