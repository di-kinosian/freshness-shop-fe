import axios from "axios";
import { LoginCredentials } from "../../../main/types/types";
import { url } from "../../../main/constants/common";

export const loginRequest = async (payload: LoginCredentials) => {
  const response = await axios.post(`${url}/auth/login`, {
    email: payload.email,
    password: payload.password,
  });
  return response.data;
};
