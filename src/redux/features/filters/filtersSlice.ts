import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filters, FiltersState, SelectedFilters } from "./types";
import axios, { AxiosError } from "axios";
import { url } from "../../../main/constants/common";

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
};

export const fetchFilters = createAsyncThunk<
  Filters,
  void,
  { rejectValue: string }
>("filters/getFilters", async (_, thunkAPI) => {
  try {
    const response = await axios.get<Filters>(`${url}/products/filters`);

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
    removeSelectedFilters: (state) => {
      state.selectedFilters = {
        ...initialFilters,
        price: state.availableFilters?.price || initialFilters.price,
      };
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
      });
  },
});

export const { setSelectedFilters, removeSelectedFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
