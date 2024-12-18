import { useEffect } from "react";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/app/hooks";
import { selectAccessToken } from "../../redux/features/auth/selectors";
import { getCart } from "../../redux/features/cart/cartSlice";

export const useCart = (): void => {
  const dispatch: AppDispatch = useDispatch();
  const token = useAppSelector(selectAccessToken);

  useEffect(() => {
    if (token) {
      dispatch(getCart());
    }
  }, [token]);
};
