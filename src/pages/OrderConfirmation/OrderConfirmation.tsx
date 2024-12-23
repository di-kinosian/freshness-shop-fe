import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../config/axios";
import { useAppSelector } from "@redux/app/hooks";
import { selectAccessToken } from "@redux/features/auth/selectors";
import { AppDispatch } from "@redux/app/store";
import { useDispatch } from "react-redux";
import { cleanUpCart } from "@redux/features/cart/cartSlice";
import { formatMoney } from "../../main/helpers";
import { Order } from "@redux/features/orders/type";

export const OrderConfirmation = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const token = useAppSelector(selectAccessToken);
  const dispatch: AppDispatch = useDispatch();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const confirm = async () => {
      const response = await api.post(
        "/order/confirm",
        { sessionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setOrder(response.data);
      dispatch(cleanUpCart());
    };

    confirm();
  }, []);

  return (
    <div className="flex flex-col gap-12 w-full min-h-[300px]">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl text-center font-semibold">Success!</h1>
        <span className="text-xl text-center">
          Thank you for your purchase! Your payment has been successfully
          processed.
        </span>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-[1fr,100px,200px] font-semibold border-b-2 pb-2">
          <div className="text-left">Product</div>
          <div className="text-center">Quantity</div>
          <div className="text-right">Price</div>
        </div>
        {order?.products.map((product) => (
          <div
            className="grid grid-cols-[1fr,100px,200px] items-center py-2 border-b last:border-b-0"
            key={product.product._id}
          >
            <div className="text-left">{product.product.title}</div>
            <div className="text-center">{product.quantity}</div>
            <div className="text-right">
              {formatMoney(product.product.price)}
            </div>
          </div>
        ))}
      </div>
      {order?.totalAmount && (
        <div className="flex gap-6">
          <div className="font-bold">Total amount: </div>
          <div className="font-bold">{formatMoney(order?.totalAmount)}</div>
        </div>
      )}
    </div>
  );
};
