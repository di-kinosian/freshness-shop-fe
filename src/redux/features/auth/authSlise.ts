import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { url } from "../../../main/constants/common";
import { MESSAGES } from "../../../main/constants/messages";
import { loginRequest } from "./api";
import {
  AuthState,
  IUserLogin,
  LoginCredentials,
  SignupCredentials,
} from "./types";
import { RootState } from "../../app/store";
import api from "../../../config/axios";

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isLoginOpen: false,
  isLoginLoading: false,
  loginError: null,
  isSignupOpen: false,
  isSignupLoading: false,
  signupError: null,
};

export const loginUser = createAsyncThunk<
  IUserLogin,
  LoginCredentials,
  { rejectValue: string }
>("auth/loginUser", async (payload, thunkAPI) => {
  try {
    const { accessToken, refreshToken, user } = await loginRequest(payload);

    return {
      accessToken,
      refreshToken,
      user,
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    return thunkAPI.rejectWithValue(
      axiosError.response && axiosError.status === 404
        ? MESSAGES.ERROR.ACCOUNT_NOT_FOUND
        : MESSAGES.ERROR.LOGIN_FAILED,
    );
  }
});

export const signupUser = createAsyncThunk<
  void,
  SignupCredentials,
  { rejectValue: string }
>("auth/signupUser", async (payload, thunkAPI) => {
  try {
    await axios.post(`${url}/users/signup`, payload);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axios.isAxiosError(axiosError) && axiosError.response) {
      return thunkAPI.rejectWithValue(
        axiosError.response.status === 400
          ? MESSAGES.ERROR.ACCOUNT_ALREADY_EXISTS
          : MESSAGES.ERROR.SIGNUP_FAILED,
      );
    } else {
      return thunkAPI.rejectWithValue(MESSAGES.ERROR.NETWORK_ERROR);
    }
  }
});

export const refreshToken = createAsyncThunk<
  { accessToken: string },
  void,
  { rejectValue: string }
>("auth/refreshToken", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const { refreshToken } = state.auth;

  try {
    const response = await api.post(`/auth/refresh-token`, {
      refreshToken,
    });

    return {
      accessToken: response.data.accessToken,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    thunkAPI.dispatch(clearAccessToken());
    return thunkAPI.rejectWithValue(axiosError.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    clearSignupError: (state) => {
      state.signupError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.isLoginLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.payload || "";
        state.isLoginLoading = false;
      })
      .addCase(signupUser.pending, (state) => {
        state.isSignupLoading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.isSignupLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupError = action.payload || "";
        state.isSignupLoading = false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken || "";
      });
  },
});

export const {
  setAccessToken,
  clearAccessToken,
  clearLoginError,
  clearSignupError,
} = authSlice.actions;
export default authSlice.reducer;
