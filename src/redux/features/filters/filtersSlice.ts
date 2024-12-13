import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filters, FiltersState, SelectedFilters } from "./types";
import { AxiosError } from "axios";
import { searchProducts } from "../products/productThunks";
import api from "../../../config/axios";

const initialFilters = {
  brands: [],
  category: "",
  price: {
    min: 0,
    max: 0,
  },
  rating: [],
};

const initialState: FiltersState = {
  availableFilters: null,
  selectedFilters: initialFilters,
  filtersError: null,
  searchValue: null,
  searchCategory: null,
};

export const fetchFilters = createAsyncThunk<
  Filters,
  void,
  { rejectValue: string }
>("filters/getFilters", async (_, thunkAPI) => {
  try {
    const response = await api.get<Filters>("/products/filters");

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    return thunkAPI.rejectWithValue(axiosError.message);
  }
});

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedFilters: (
      state,
      action: PayloadAction<Partial<SelectedFilters>>,
    ) => {
      state.selectedFilters = {
        ...state.selectedFilters,
        ...action.payload,
      };
    },
    resetFilters: (state) => {
      state.selectedFilters = {
        ...initialFilters,
        price: state.availableFilters?.price || initialFilters.price,
      };
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    clearSearchValue: (state) => {
      state.searchValue = "";
    },
    setSearchCategory: (state, action) => {
      state.searchCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.availableFilters = action.payload;
        state.selectedFilters.price = action.payload.price;
        state.filtersError = null;
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.filtersError = action.payload || "Failed to fetch filters";
      })
      .addCase(searchProducts.pending, (state) => {
        state.selectedFilters = {
          ...initialFilters,
          price: state.availableFilters?.price || initialFilters.price,
        };
      });
  },
});

export const {
  setSelectedFilters,
  resetFilters,
  setSearchValue,
  setSearchCategory,
  clearSearchValue,
} = filtersSlice.actions;
export default filtersSlice.reducer;
