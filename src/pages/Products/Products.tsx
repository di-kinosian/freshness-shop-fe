import { useCallback, useEffect, useState } from "react";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../main/hooks";
import { getAllProducts } from "../../redux/features/products/productsSlice";
import { ProductItem } from "../../components/Product/ProductItem";
import { AsideFilter } from "../../components/Filters/AsideFilter";
import { AllProductsHeader } from "../../components/AllProductsHeader/AllProductsHeader";
import { ControlContainer } from "../../components/ControlContainer/ControlContainer";
import { Select } from "../../components/Select/Select";
import { sortOptions } from "../../main/constants/filter.sort.data";
import { PaginationController } from "../../components/Pagination/Pagination";
import { Button } from "../../components/Button/Button";
import { Bage } from "../../components/Bage/Bage";
import { Product } from "../../redux/features/products/types";

export const Products = () => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedFilters } = useAppSelector((state) => state.filters);
  const { products, total, limit, page } = useAppSelector(
    (state) => state.product,
  );
  const totalPages = Math.ceil(total / limit);

  const [sortData, setSortData] = useState<{ field: string; order: string }>();
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [showMoreMode, setShowMoreMode] = useState<boolean>(false);

  const getSortParams = useCallback((value: string): void => {
    const [field, order] = value.split("_");
    setSortData({ field, order });
  }, []);

  useEffect(() => {
    dispatch(
      getAllProducts({
        page: currentPage,
        limit,
        categoryId: selectedFilters.category,
        brands: selectedFilters.brands,
        priceMax: selectedFilters.price.max,
        priceMin: selectedFilters.price.min,
        rating: selectedFilters.rating || 5,
        sortField: sortData?.field,
        sortDirection: sortData?.order,
      }),
    );
  }, [selectedFilters, sortData, currentPage]);

  useEffect(() => {
    if (showMoreMode) {
      setVisibleProducts((prev) => {
        const uniqueProducts = new Map();
        [...prev, ...products].forEach((product) => {
          uniqueProducts.set(product._id, product);
        });
        return Array.from(uniqueProducts.values());
      });
    } else {
      setVisibleProducts(products);
    }
  }, [products, showMoreMode, currentPage]);

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
    setShowMoreMode(false);
  };

  const handleShowMore = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setShowMoreMode(true);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <AllProductsHeader />
        <div className="w-[170px]">
          <ControlContainer
            leftElement={
              <span className="bg-neutralGrayBg w-[50px] text-sm">Sort by</span>
            }
            rightElement={
              <div className="flex gap-1 items-center">
                <Select options={sortOptions} getParams={getSortParams} />
              </div>
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-[270px,2fr] gap-8 max-w-[1200px] mx-auto w-full">
        <AsideFilter />
        <div className="flex flex-col gap-[34px] items-end">
          {visibleProducts?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
      <div className="flex w-full items-center">
        <div className="flex-1">
          <PaginationController
            page={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <Button className="flex gap-2 mx-auto" onClick={handleShowMore}>
          <span>Show more products</span>
          <img
            src="/vector-button.svg"
            alt="Vector right for button"
            className="rotate-90"
          />
        </Button>
        <div className="flex gap-2 flex-1 justify-end">
          <Bage>{total}</Bage>
          <span className="text-grayText">Products</span>
        </div>
      </div>
    </div>
  );
};
