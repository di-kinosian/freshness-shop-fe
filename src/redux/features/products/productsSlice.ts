import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { url } from "../../../main/constants/common";
import {
  GetAllProductsPayload,
  GetProductPayload,
  Product,
  ProductsState,
} from "./types";
import api from "../../../config/axios";

const initialState: ProductsState = {
  products: [],
  product: null,
  relatedProducts: [],
  total: 0,
  page: 1,
  limit: 5,
  productError: null,
  productsError: null,
  relatedProductsError: null,
  wishList: [],
  isWishListLoading: false,
  wishListError: null,
};

export const getProduct = createAsyncThunk<
  Product,
  GetProductPayload,
  { rejectValue: string }
>("products/product", async (payload, thunkAPI) => {
  try {
    const { _id } = payload;
    const response = await axios.get(`${url}/products/${_id}`);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    return thunkAPI.rejectWithValue(axiosError.message);
  }
});

export const getAllProducts = createAsyncThunk<
  {
    products: Product[];
    total: number;
    page: number;
    limit: number;
  },
  GetAllProductsPayload,
  { rejectValue: string }
>("product/getAllProducts", async (payload, thunkAPI) => {
  try {
    const {
      page,
      limit,
      categoryId,
      brands,
      priceMin,
      priceMax,
      rating,
      sortField,
      sortDirection,
    } = payload;

    const { data } = await axios.get(`${url}/products`, {
      params: {
        page,
        limit,
        sortField,
        sortDirection,
        categoryId,
        ...(brands?.length && { brands }),
        ...(priceMin !== undefined && { priceMin }),
        ...(priceMax !== undefined && { priceMax }),
        ...(rating?.length && { rating }),
      },
    });

    return {
      products: data.items,
      total: data.total,
      page: data.page,
      limit,
      sortField,
      sortDirection,
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    return thunkAPI.rejectWithValue(axiosError.message);
  }
});

export const fetchRelatedProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("product/getRelatedProducts", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${url}/products`, {
      params: {
        page: 1,
        limit: 5,
      },
    });

    return data.items;
  } catch (error) {
    const axiosError = error as AxiosError;

    return thunkAPI.rejectWithValue(axiosError.message);
  }
});

export const getWishList = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("product/getWishList", async (_, thunkAPI) => {
  try {
    const response = await api.get(`/users/wish-list`);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    return thunkAPI.rejectWithValue(axiosError.message);
  }
});

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.productsError = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.productsError = action.payload || "Failed to fetch products";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.productError = null;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.productError = action.payload || "Failed to fetch product";
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedProducts = action.payload;
        state.relatedProductsError = null;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.relatedProductsError =
          action.payload || "Failed to fetch related products";
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.wishList = action.payload;
        state.isWishListLoading = false;
        state.wishListError = null;
      })
      .addCase(getWishList.pending, (state) => {
        state.isWishListLoading = true;
        state.wishListError = null;
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.wishListError = action.payload || "";
        state.isWishListLoading = false;
      });
  },
});

export const { clearProduct } = productsSlice.actions;
export default productsSlice.reducer;
