import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "@redux/app/hooks";
import { selectAccessToken } from "@redux/features/auth/selectors";
import { AppDispatch } from "@redux/app/store";
import { useDispatch } from "react-redux";
import { confirmOrder } from "@redux/features/orders/ordersSlice";

export const OrderConfirmation = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const token = useAppSelector(selectAccessToken);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (sessionId && token) {
      dispatch(confirmOrder({ sessionId, token }));
    }
  }, [dispatch, sessionId, token]);

  return <div>Confirmation Page</div>;
};
