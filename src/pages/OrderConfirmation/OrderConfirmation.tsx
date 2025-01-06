import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "@redux/app/hooks";
import { selectAccessToken } from "@redux/features/auth/selectors";
import { AppDispatch } from "@redux/app/store";
import { useDispatch } from "react-redux";
import { cleanUpCart } from "@redux/features/cart/cartSlice";
import api from "../../config/axios";

export const OrderConfirmation = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const token = useAppSelector(selectAccessToken);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const confirm = async () => {
      await api.post(
        "/order/confirm",
        { sessionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch(cleanUpCart());
    };
    confirm();
  }, []);

  return <div>Confirmation Page</div>;
};
