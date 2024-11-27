import { useEffect } from "react";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../main/hooks";
import { getAllProducts } from "../../redux/features/products/productsSlice";
import { ProductItem } from "../../components/Product/ProductItem";
import { AsideFilter } from "../../components/Filters/AsideFilter";
import { AllProductsHeader } from "../../components/AllProductsHeader/AllProductsHeader";
import { ControlContainer } from "../../components/ControlContainer/ControlContainer";
import { Select } from "../../components/Select/Select";
import { ControlSize } from "../../main/types/enums";

export const Products = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products } = useAppSelector((state) => state.product);
  const { selectedFilters } = useAppSelector((state) => state.filters);

  const sortOptions = [
    { value: "rating_desc", label: "Rating: High to Low" },
    { value: "rating_asc", label: "Rating: Low to High" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
  ];

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
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <AllProductsHeader />
        <div className="w-[170px]">
          <ControlContainer
            size={ControlSize.MEDIUM}
            leftElement={
              <span className="bg-neutralGrayBg w-[50px] text-sm">Sort by</span>
            }
            rightElement={
              <div className="flex gap-1 items-center">
                <Select options={sortOptions} />
              </div>
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-[270px,2fr] gap-8 max-w-[1200px] mx-auto w-full">
        <AsideFilter />
        <div className="flex flex-col gap-[34px] items-end">
          {products?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
