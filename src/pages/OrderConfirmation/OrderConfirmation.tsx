import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "@redux/app/hooks";
import { AppDispatch } from "@redux/app/store";
import { useDispatch } from "react-redux";
import { formatMoney } from "../../main/helpers";
import { confirmOrder } from "@redux/features/orders/ordersSlice";

export const OrderConfirmation = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const dispatch: AppDispatch = useDispatch();
  const { confirmationOrder } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (sessionId) {
     dispatch(confirmOrder({ sessionId }));
    }
  }, []);

  return (
    <div className="flex flex-col gap-12 w-full min-h-[300px] mt-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl text-center font-semibold">Success!</h1>
        <span className="text-xl text-center">
          Thank you for your purchase! Your payment has been successfully
          processed.
        </span>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-[100px,100px,100px] xs:grid-cols-[200px,120px,120px] sm:grid-cols-[1fr,100px,200px] font-semibold border-b-2 pb-2">
          <div className="text-left">Product</div>
          <div className="text-center">Quantity</div>
          <div className="text-right">Price</div>
        </div>
        {confirmationOrder?.products.map((product) => (
          <div
            className="grid grid-cols-[100px,100px,100px] xs:grid-cols-[200px,120px,120px] sm:grid-cols-[1fr,100px,200px] items-center py-2 border-b last:border-b-0"
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
      {confirmationOrder?.totalAmount && (
        <div className="flex gap-6">
          <div className="font-bold">Total amount: </div>
          <div className="font-bold">
            {formatMoney(confirmationOrder?.totalAmount)}
          </div>
        </div>
      )}
    </div>
  );
};
