/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

export const handleAxiosError = (error: unknown, thunkAPI: any): any => {
  const axiosError = error as AxiosError;
  return thunkAPI.rejectWithValue(axiosError.message);
};
