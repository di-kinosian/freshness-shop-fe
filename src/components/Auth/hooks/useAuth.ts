import { useEffect } from "react";
import { AppDispatch } from "../../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/app/hooks";
import { getUserProfile } from "../../../redux/features/auth/authSlise";
import { selectAccessToken } from "../../../redux/features/auth/selectors";

export const useProfile = (): void => {
  const dispatch: AppDispatch = useDispatch();
  const token = useAppSelector(selectAccessToken);

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile());
    }
  }, [token]);
};
