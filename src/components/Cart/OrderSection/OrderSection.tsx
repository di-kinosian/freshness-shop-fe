import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import { selectCart } from "../../../redux/features/cart/selectors";
import { ProductCard } from "./ProductCard/ProductCard";
import { formatMoney } from "../../../main/helpers";

export const OrderSection = () => {
  const cart = useAppSelector(selectCart);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const result = cart.reduce((acc, product) => {
      return (acc = acc + (product.product.price * product.quantity || 1));
    }, 0);
    setTotal(result);
  }, [cart, total]);

  return (
    <div className="flex flex-col gap-4 p-4 border border-basicGray rounded-lg w-full h-fit">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Order summary</h2>
        <span className="text-grayText text-sm">
          Price can change depending on shipping method and taxes of your state.
        </span>
      </div>
      {cart.map((item) => (
        <ProductCard productItem={item} key={item.product._id} />
      ))}
      <div className="flex gap-4">
        <span className="font-bold">Total price:</span>
        <span className="text-neutralGreenBg font-bold">
          {formatMoney(total)}
        </span>
      </div>
    </div>
  );
};
