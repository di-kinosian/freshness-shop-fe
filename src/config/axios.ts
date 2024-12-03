import axios from "axios";
import {} from "../redux/app/store";
import { url } from "../main/constants/common";
import { logout, refreshToken } from "../redux/features/auth/authSlise";

let store: any;

export const setStore = (reduxStore: any) => {
  store = reduxStore;
};

const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use((config) => {
  if (!store) return config;

  const state = store.getState();
  const token = state.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {

      if (originalRequest.url === "/auth/refresh-token") {
        store.dispatch(logout);
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      await store.dispatch(refreshToken());
      const state = store.getState();
      const newToken = state.auth.accessToken;

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
