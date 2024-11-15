import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { url } from "../../../main/constants/common";
import { Category, CategoryState } from "./types";

const initialState: CategoryState = {
  categories: [],
  categoriesError: null,
};

export const getAllCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/getAllCategories", async (_, thunkAPI) => {
  try {
    const response = await axios.get<Category[]>(`${url}/categories`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(axiosError.message);
  }
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchCategoriesList: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesError = null;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.categoriesError = action.payload || "Failed to fetch categories";
      });
  },
});

export const { fetchCategoriesList } = categoriesSlice.actions;
export default categoriesSlice.reducer;
