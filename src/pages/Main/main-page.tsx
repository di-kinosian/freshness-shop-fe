import { useEffect } from "react";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../main/hooks";
import { getAllProducts } from "../../redux/features/product/productSlice";
import { ProductItem } from "../../components/Product/ProductItem";

export const Main = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts({ page: 1, limit: 5 }));
  }, []);

  return (
    <div className="flex flex-col gap-[34px] pt-10 items-end">
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
  );
};
