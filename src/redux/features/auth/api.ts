import { LoginCredentials } from "./types";
import api from "../../../config/axios";

export const loginRequest = async (payload: LoginCredentials) => {
  const response = await api.post("/auth/login", {
    email: payload.email,
    password: payload.password,
  });
  return response.data;
};
