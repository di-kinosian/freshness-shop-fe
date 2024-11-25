import { useEffect } from "react";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../main/hooks";
import { getAllProducts } from "../../redux/features/products/productsSlice";
import { ProductItem } from "../../components/Product/ProductItem";
import { AsideFilter } from "../../components/Filters/AsideFilter";

export const Main = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products } = useAppSelector((state) => state.product);
  const { selectedFilters } = useAppSelector((state) => state.filters);

  useEffect(() => {
    dispatch(
      getAllProducts({
        page: 1,
        limit: 5,
        brands: selectedFilters.brands,
        priceMax: selectedFilters.price.max,
        priceMin: selectedFilters.price.min,
        rating: selectedFilters.rating || 5,
      }),
    );
  }, [selectedFilters]);

  return (
    <div className="grid grid-cols-[270px,2fr] gap-8 max-w-[1200px] mx-auto">
      <AsideFilter />
      <div className="flex flex-col gap-[34px] items-end">
        {products?.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            title={product.title}
            description={product.description}
            rating={product.rating}
            price={product.price}
            additionalInformation={product.additionalInformation}
          />
        ))}
      </div>
    </div>
  );
};
