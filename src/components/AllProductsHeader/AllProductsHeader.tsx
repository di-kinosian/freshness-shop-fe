import { useAppSelector } from "../../redux/app/hooks";
import { selectTotal } from "../../redux/features/products/selectors";
import { Bage } from "../Bage/Bage";

export const AllProductsHeader = () => {
  const total = useAppSelector(selectTotal);

  return (
    <div className="flex justify-between items-center max-w-[1200px] w-full mx-auto">
      <span className="font-semibold text-3xl">All Products</span>
      <div className="flex gap-2">
        <Bage>{total}</Bage>
        <span className="text-grayText">Products</span>
      </div>
    </div>
  );
};
