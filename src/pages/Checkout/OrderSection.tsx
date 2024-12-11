import { ProductCard } from "./ProductCard";

export const OrderSection = () => {
  return (
    <div className="flex flex-col gap-4 p-4 border border-basicGray rounded-lg w-full">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Order summary</h2>
        <span className="text-grayText text-sm">
          Price can change depending on shipping method and taxes of your state.
        </span>
      </div>
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};
