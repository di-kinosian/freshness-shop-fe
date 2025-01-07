import { useEffect, useState } from "react";
import { AppDispatch } from "@redux/app/store";
import { useDispatch } from "react-redux";
import { createOrder, fetchOrders } from "@redux/features/orders/ordersSlice";
import { useAppSelector } from "@redux/app/hooks";
import { Order } from "@redux/features/orders/type";
import { formatDate, formatMoney } from "../../main/helpers";
import { Chip } from "@mui/material";
import { OrderCardSkeleton } from "./OrdersSkeletot";
import { Button } from "@components/Button/Button";

const getAddress = (billingInfo: Order["billingInfo"]) => {
  return `${billingInfo.address}, ${billingInfo.city}, ${billingInfo.country}, ${billingInfo.zipCode}`;
};

const PaymentStatus = ({ status }: { status: string }) => {
  if (status === "paid") {
    return <Chip color="success" label="Paid" size="small" />;
  }
  if (status === "unpaid") {
    return <Chip color="error" label="Unpaid" size="small" />;
  }
};

const OrderStatus = ({ status }: { status: string }) => {
  if (status === "completed") {
    return <Chip color="success" label="Completed" size="small" />;
  }
  if (status === "pending") {
    return <Chip color="warning" label="Pending" size="small" />;
  }
};

const preparePayload = (order: Order) => {
  const orderCopy = { ...order };
  delete orderCopy.createdAt;
  delete orderCopy.id;
  delete orderCopy.updatedAt;
  delete orderCopy.checkoutId;
  return orderCopy;
};

const OrderCard = ({ data }: { data: Order }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg px-6 py-4 flex flex-col gap-3">
      <div className="grid grid-cols-[150px,1fr] gap-3">
        <div>Date:</div>
        <div>{data.createdAt ? formatDate(data.createdAt) : "N/A"}</div>
        <div>Payment status:</div>
        <div>
          <PaymentStatus status={data.paymentStatus} />
        </div>
        <div>Address:</div>
        <div>{getAddress(data.billingInfo)}</div>
        <div>Order status:</div>
        <div>
          <OrderStatus status={data.status} />
        </div>
        <div>Total:</div>
        <div>{formatMoney(data.totalAmount)}</div>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-6 shrink-0">
          <div className="grid grid-cols-[100px,100px,100px] xs:grid-cols-[1fr,1fr,1fr] sm:grid-cols-[2fr,1fr,1fr] font-semibold border-b-2 pb-2">
            <div className="text-left">Product</div>
            <div className="text-center">Quantity</div>
            <div className="text-right">Price</div>
          </div>
          {data?.products.map((product) => (
            <div
              className="grid grid-cols-[100px,100px,100px] xs:grid-cols-[1fr,1fr,1fr] sm:grid-cols-[2fr,1fr,1fr] items-center py-2 border-b last:border-b-0"
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
      )}
      <div className="flex justify-between">
        <span
          className="text-neutralGreenBg hover:underline"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Hide products" : "Show products"}
        </span>

        {data.status === "pending" && (
          <Button
            onClick={() => {
              dispatch(createOrder(preparePayload(data)));
            }}
          >
            Finish
          </Button>
        )}
      </div>
    </div>
  );
};

export const Orders = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders = useAppSelector((state) => state.orders.orders);

  const isOrdersLoading = useAppSelector(
    (state) => state.orders.isOrderLoading,
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  if (isOrdersLoading) {
    return <OrderCardSkeleton />;
  }

  return (
    <div className="flex flex-col gap-12 w-full min-h-[300px] mt-12">
      {orders.map((order) => {
        return <OrderCard data={order} />;
      })}
    </div>
  );
};
