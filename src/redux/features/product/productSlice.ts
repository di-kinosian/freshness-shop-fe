import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { url } from "../../../main/constants/common";
import {
  Product,
  ProductCredentials,
  ProductState,
} from "../../../main/types/types";

const initialState: ProductState = {
  products: null,
  total: 0,
  page: 1,
  limit: 6,
  productError: null,
};

export const getAllProducts = createAsyncThunk<
  { products: Product[]; total: number; page: number; limit: number },
  ProductCredentials,
  { rejectValue: string }
>("product/getAllProducts", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.get(`${url}/products`, {
      params: { page: payload.page, limit: payload.limit },
    });

    return {
      products: data.items,
      total: data.total,
      page: data.page,
      limit: payload.limit,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(axiosError.message);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    saveProductList: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.productError = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.productError = action.payload || "Failed to fetch products";
      });
  },
});

export const { saveProductList } = productSlice.actions;
export default productSlice.reducer;
