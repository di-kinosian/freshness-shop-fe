import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetProductPayload, Product } from "./types";
import { AxiosError } from "axios";
import { RootState } from "../../app/store";
import api from "../../../config/axios";

const getProductsParams = (state: RootState) => {
  const priceMin = state.filters.selectedFilters.price.min;
  const priceMax = state.filters.selectedFilters.price.max;
  const brands = state.filters.selectedFilters.brands;
  const rating = state.filters.selectedFilters.rating;
  const limit = state.product.limit;
  const categoryId = state.filters.searchValue
    ? state.filters.searchCategory
    : state.filters.selectedFilters.category;
  const [sortField, sortDirection] = state.product.sortValue.split("_");
  const page = state.product.page;
  const searchValue = state.filters.searchValue;

  return {
    page,
    limit,
    sortField,
    sortDirection,
    categoryId,
    searchValue,
    brands,
    priceMin,
    priceMax,
    rating,
  };
};

export const getProduct = createAsyncThunk<
  Product,
  GetProductPayload,
  { rejectValue: string }
>("products/product", async (payload, thunkAPI) => {
  try {
    const { _id } = payload;
    const response = await api.get(`/products/${_id}`);

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
  void,
  { rejectValue: string }
>("product/getAllProducts", async (_, thunkAPI) => {
  try {
    const state: RootState = thunkAPI.getState() as RootState;
    const { data } = await api.get("/products", {
      params: {
        ...getProductsParams(state),
      },
    });

    return {
      products: data.items,
      total: data.total,
      page: data.page,
      limit: data.limit,
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    return thunkAPI.rejectWithValue(axiosError.message);
  }
});

export const showMoreProducts = createAsyncThunk<
  {
    products: Product[];
    total: number;
    page: number;
    limit: number;
  },
  void,
  { rejectValue: string }
>("product/showMoreProducts", async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const page = (state.product.showMorePage || state.product.page) + 1;

  try {
    const { data } = await api.get("/products", {
      params: {
        ...getProductsParams(state),
        page,
      },
    });

    return {
      products: data.items,
      total: data.total,
      page: data.page,
      limit: data.page,
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    return thunkAPI.rejectWithValue(axiosError.message);
  }
});

export const searchProducts = createAsyncThunk<
  {
    products: Product[];
    total: number;
    page: number;
    limit: number;
  },
  { searchValue: string },
  { rejectValue: string }
>("product/searchProducts", async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const categoryId = state.filters.searchCategory;

  try {
    const { data } = await api.get("/products", {
      params: {
        ...getProductsParams(state),
        categoryId,
        page: 1,
      },
    });

    return {
      products: data.items,
      total: data.total,
      page: data.page,
      limit: data.limit,
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
    const { data } = await api.get("/products", {
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
    const response = await api.get("/users/wish-list");

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    return thunkAPI.rejectWithValue(axiosError.message);
  }
});
