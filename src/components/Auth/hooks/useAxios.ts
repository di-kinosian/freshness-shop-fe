import { useEffect } from "react";
import { createApiWithAuth } from "../../../config/axios";
import { store } from "../../../redux/app/store";

export const useAxios = (): void => {
  useEffect(() => {
    createApiWithAuth(store);
  }, []);
};
