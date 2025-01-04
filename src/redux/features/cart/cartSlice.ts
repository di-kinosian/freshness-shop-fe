import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartPayload, Cart, CartState } from "./types";
import api from "../../../config/axios";
import { handleAxiosError } from "../utils/handleThunkError";
import { ThunkRejectValue } from "../../types";

const initialState: CartState = {
  cart: [],
  cartError: null,
  isCartLoading: false,
  addToCartError: null,
  deleteFromCartError: null,
  editQuantityError: null,
};

export const getCart = createAsyncThunk<Cart[], void, ThunkRejectValue>(
  "cart/getCart",
  async (_, thunkAPI) => {
    try {
      const response = await api.get<Cart[]>("/cart");

      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const addToCart = createAsyncThunk<void, CartPayload, ThunkRejectValue>(
  "cart/addToCart",
  async (payload, thunkAPI) => {
    try {
      await api.post("cart/add", { ...payload });
      thunkAPI.dispatch(getCart());
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const deleteFromCart = createAsyncThunk<
  void,
  { productId: string },
  ThunkRejectValue
>("cart/deleteFromCart", async (payload, thunkAPI) => {
  try {
    await api.delete("cart/item/remove", {
      data: { productId: payload.productId },
    });
    thunkAPI.dispatch(getCart());
  } catch (error) {
    return handleAxiosError(error, thunkAPI);
  }
});

export const editQuantity = createAsyncThunk<
  void,
  CartPayload,
  ThunkRejectValue
>("cart/editQuantity", async (payload, thunkAPI) => {
  try {
    await api.put("cart/item/update", {
      productId: payload.productId,
      quantity: payload.quantity,
    });
  } catch (error) {
    return handleAxiosError(error, thunkAPI);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.cartError = null;
      })
      .addCase(getCart.pending, (state) => {
        state.isCartLoading = true;
        state.cartError = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.cartError = action.payload || "Failed to fetch cart";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addToCartError = action.payload || "Failed add to cart";
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.deleteFromCartError = action.payload || "Failed remove from cart";
      })
      .addCase(editQuantity.pending, (state, action) => {
        state.cart = state.cart.map((item) =>
          item.product._id === action.meta.arg.productId
            ? {
                ...item,
                quantity: action.meta.arg.quantity,
              }
            : item,
        );
      })
      .addCase(editQuantity.rejected, (state, action) => {
        state.editQuantityError = action.payload || "Failed edit quantity";
      });
  },
});

export default cartSlice.reducer;
