import { ProductCard } from "./ProductCard";
import { useAppSelector } from "../../redux/app/hooks";
import { selectCart } from "../../redux/features/cart/selectors";

export const OrderSection = () => {
  const cart = useAppSelector(selectCart);

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
    </div>
  );
};
