import { useEffect } from "react";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../main/hooks";
import {
  setPage,
  setSortValue,
} from "../../redux/features/products/productsSlice";
import { ProductItem } from "../../components/Product/ProductItem";
import { AsideFilter } from "../../components/Filters/AsideFilter";
import { AllProductsHeader } from "../../components/AllProductsHeader/AllProductsHeader";
import { ControlContainer } from "../../components/ControlContainer/ControlContainer";
import { Select } from "../../components/Select/Select";
import { sortOptions } from "../../main/constants/filter.sort.data";
import { PaginationController } from "../../components/Pagination/Pagination";
import { Button } from "../../components/Button/Button";
import { Bage } from "../../components/Bage/Bage";
import {
  getAllProducts,
  showMoreProducts,
} from "../../redux/features/products/productThunks";

export const Products = () => {
  const dispatch: AppDispatch = useDispatch();
  const wishList = useAppSelector((state) => state.auth.user?.wishList);
  const { products, total, limit, page, showMorePage, sortValue } =
    useAppSelector((state) => state.product);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [sortValue, page]);


  const handlePageChange = (newPage: number): void => {
    dispatch(setPage(newPage));
  };

  const handleShowMore = (): void => {
    dispatch(showMoreProducts());
  };

  const lastDownloadedPage = showMorePage || page;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <AllProductsHeader />
        <div className="w-[270px]">
          <ControlContainer
            leftElement={
              <span className="bg-neutralGrayBg text-sm w-[50px]">Sort by</span>
            }
            rightElement={
              <div className="px-4">
                <Select
                  width={170}
                  options={sortOptions}
                  onChange={(value: string) => dispatch(setSortValue(value))}
                  value={sortValue}
                />
              </div>
            }
          />
        </div>
      </div>
      <div className="grid xl:grid-cols-[270px,1fr] lg:grid-cols-[250px,1fr] custom:grid-cols-1 md:grid-cols-1 gap-8 max-w-[1200px] mx-auto w-full">
        <AsideFilter />
        <div className="flex flex-col gap-[34px] items-end">
          {products?.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              wishList={wishList}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full items-center">
        <div className="flex-1">
          <PaginationController
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        {lastDownloadedPage < totalPages ? (
          <Button className="flex gap-2 mx-auto" onClick={handleShowMore}>
            <span>Show more products</span>
            <img
              src="/vector-button.svg"
              alt="Vector right for button"
              className="rotate-90"
            />
          </Button>
        ) : null}
        <div className="flex gap-2 flex-1 justify-end">
          <Bage>{total}</Bage>
          <span className="text-grayText">Products</span>
        </div>
      </div>
    </div>
  );
};
