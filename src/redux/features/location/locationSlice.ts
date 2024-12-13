import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CountriesState, Country } from "./types";
import { ThunkRejectValue } from "../../types";
import { handleAxiosError } from "../utils/handleThunkError";
import api from "../../../config/axios";

const initialState: CountriesState = {
  countries: [],
  countriesError: null,
  cities: [],
  citiesError: null,
};

export const getCountries = createAsyncThunk<Country[], void, ThunkRejectValue>(
  "countries/getCountries",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(
        "https://countriesnow.space/api/v0.1/countries/capital",
      );

      return [...response.data.data];
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const getCities = createAsyncThunk<
  string[],
  { country: string },
  ThunkRejectValue
>("countries/getCities", async (payload, thunkAPI) => {
  try {
    const response = await api.post(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {
        country: payload.country,
      },
    );

    return response.data.data;
  } catch (error) {
    return handleAxiosError(error, thunkAPI);
  }
});

const locationSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.countriesError = null;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.countriesError = action.payload || "Failed to fetch countries";
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.cities = action.payload;
        state.citiesError = null;
      })
      .addCase(getCities.rejected, (state, action) => {
        state.citiesError = action.payload || "Failed to fetch cities";
      });
  },
});

export default locationSlice.reducer;
