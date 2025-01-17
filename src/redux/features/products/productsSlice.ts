import { createSlice } from "@reduxjs/toolkit";
import { ProductsState } from "./types";

import {
  fetchRelatedProducts,
  getAllProducts,
  getProduct,
  getWishList,
  searchProducts,
  showMoreProducts,
} from "./productThunks";
import { setSelectedFilters } from "../filters/filtersSlice";

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
  showMorePage: null,
  sortValue: "rating_desc",
};

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
      state.showMorePage = null;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = [...action.payload.products];
        state.total = action.payload.total;
        state.productsError = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.productsError = action.payload || "Failed to fetch products";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.showMorePage = null;
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
        state.wishListError = action.payload || null;
        state.isWishListLoading = false;
      })
      .addCase(showMoreProducts.fulfilled, (state, action) => {
        state.showMorePage = action.payload.page;
        state.products = [...state.products, ...action.payload.products];
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
      })
      .addCase(setSelectedFilters, (state) => {
        state.page = 1;
      });
  },
});

export const { clearProduct, setPage, setSortValue } = productsSlice.actions;
export default productsSlice.reducer;
