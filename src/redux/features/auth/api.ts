import axios from "axios";
import { url } from "../../../main/constants/common";
import { LoginCredentials } from "./types";

export const loginRequest = async (payload: LoginCredentials) => {
  const response = await axios.post(`${url}/auth/login`, {
    email: payload.email,
    password: payload.password,
  });
  return response.data;
};
