import { useEffect } from "react";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../main/hooks";
import { getAllProducts } from "../../redux/features/products/productsSlice";
import { ProductItem } from "../../components/Product/ProductItem";

export const Main = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts({ page: 1, limit: 5 }));
  }, []);

  return (
    <div className="grid grid-cols-[1fr,2fr] gap-8 max-w-[1200px] mx-auto">
      <div className="">
        <span className="text-lg font-semibold">Categories</span>
      </div>
      <div className="flex flex-col gap-[34px] items-end">
        {products?.map((product) => (
          <ProductItem
            key={product._id}
            title={product.title}
            description={product.description}
            raiting={product.rating}
            price={product.price}
            additionalInformation={product.additionalInformation}
          />
        ))}
      </div>
    </div>
  );
};
