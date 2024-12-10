import { useEffect } from "react";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../main/hooks";
import {
  getUserProfile,
  refreshToken,
} from "../../redux/features/auth/authSlise";
import { selectAccessToken } from "../../redux/features/auth/selectors";

export const useAuth = (): void => {
  const dispatch: AppDispatch = useDispatch();
  const token = useAppSelector(selectAccessToken);

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile());
    }
  }, [token]);

  useEffect(() => {
    let interval = 0;
    if (token) {
      interval = setTimeout(() => {
        dispatch(refreshToken());
      }, 1.9 * 60 * 1000);
    }

    return () => clearTimeout(interval);
  }, [token]);
};
