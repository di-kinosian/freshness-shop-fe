import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetProductPayload, Product, PaginatedProductsResponse } from "./types";
import { RootState } from "../../app/store";
import api from "../../../config/axios";
import { handleAxiosError } from "../utils/handleThunkError";
import { ThunkRejectValue } from "../../types";

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
  ThunkRejectValue
>("products/product", async (payload, thunkAPI) => {
  try {
    const { _id } = payload;
    const response = await api.get(`/products/${_id}`);

    return response.data;
  } catch (error) {
    return handleAxiosError(error, thunkAPI);
  }
});

export const getAllProducts = createAsyncThunk<
  PaginatedProductsResponse,
  void,
  ThunkRejectValue
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
    return handleAxiosError(error, thunkAPI);
  }
});

export const showMoreProducts = createAsyncThunk<
  PaginatedProductsResponse,
  void,
  ThunkRejectValue
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
    return handleAxiosError(error, thunkAPI);
  }
});

export const searchProducts = createAsyncThunk<
  PaginatedProductsResponse,
  { searchValue: string },
  ThunkRejectValue
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
    return handleAxiosError(error, thunkAPI);
  }
});

export const fetchRelatedProducts = createAsyncThunk<
  Product[],
  void,
  ThunkRejectValue
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
    return handleAxiosError(error, thunkAPI);
  }
});

export const getWishList = createAsyncThunk<Product[], void, ThunkRejectValue>(
  "product/getWishList",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/users/wish-list");

      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);
