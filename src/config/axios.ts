import axios from "axios";
import { url } from "../main/constants/common";
import { logout, refreshToken } from "../redux/features/auth/authSlise";
import { jwtDecode } from "jwt-decode";
import { store as rootStore } from "../redux/app/store";

const api = axios.create({
  baseURL: url,
});

function isTokenExpired(token: string) {
  try {
    const { exp } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    return exp && exp < currentTime;
  } catch {
    return true;
  }
}

type Store = typeof rootStore;

export const createApiWithAuth = (store: Store) => {
  api.interceptors.request.use(async (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (
      config.url !== "/auth/refresh-token" &&
      token &&
      isTokenExpired(token)
    ) {
      try {
        await store.dispatch(refreshToken());
        const updatedState = store.getState();
        const newToken = updatedState.auth.accessToken;

        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
        }
      } catch (error) {
        store.dispatch(logout);

        return Promise.reject(error);
      }
    }

    return config;
  });
};

export default api;
