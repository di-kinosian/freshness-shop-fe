import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Category, CategoryState } from "./types";
import api from "../../../config/axios";
import { handleAxiosError } from "../utils/handleThunkError";
import { ThunkRejectValue } from "../../types";

const initialState: CategoryState = {
  categories: [],
  categoriesError: null,
};

export const getAllCategories = createAsyncThunk<
  Category[],
  void,
  ThunkRejectValue
>("categories/getAllCategories", async (_, thunkAPI) => {
  try {
    const response = await api.get<Category[]>("/categories");

    return response.data;
  } catch (error) {
    return handleAxiosError(error, thunkAPI);
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
