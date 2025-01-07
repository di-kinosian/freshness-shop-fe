import { useEffect, useState } from "react";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/app/hooks";
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
import { selectWishList } from "../../redux/features/auth/selectors";
import {
  selectIsProductsLoading,
  selectProducts,
} from "../../redux/features/products/selectors";
import { selectCart } from "../../redux/features/cart/selectors";
import { ProductPageSkeleton } from "./ProductPageSkeleton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FiterSidebar } from "@components/Filters/AsideMenu/AsideMenu";
import { twMerge } from "tailwind-merge";

export const Products = () => {
  const dispatch: AppDispatch = useDispatch();
  const wishList = useAppSelector(selectWishList);
  const products = useAppSelector(selectProducts);
  const isProductsLoading = useAppSelector(selectIsProductsLoading);
  const cart = useAppSelector(selectCart);
  const { total, limit, page, showMorePage, sortValue } = useAppSelector(
    (state) => state.product,
  );
  const totalPages = Math.ceil(total / limit);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const handlePageChange = (newPage: number): void => {
    dispatch(setPage(newPage));
    dispatch(getAllProducts());
  };

  const handleShowMore = (): void => {
    dispatch(showMoreProducts());
  };

  const onSortChange = (value: string) => {
    dispatch(setPage(1));
    dispatch(setSortValue(value));
    dispatch(getAllProducts());
  };

  const toggleSidebar = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  const lastDownloadedPage = showMorePage || page;

  const renderProducts = () => {
    if (total === 0) {
      return (
        <div className="flex flex-col gap-3 text-center">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-illustration-download-in-svg-png-gif-file-formats--online-shop-store-shopping-site-marketplace-states-pack-windows-interface-illustrations-9824480.png"
            alt="Empty Cart"
            className="w-32 h-32 mx-auto"
          />
          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Product list is empty
          </h1>
          <p className="mt-2 text-gray-600">
            Oops! There are no products available in this category. Check back
            later or explore other categories!
          </p>
        </div>
      );
    }

    return products?.map((product) => {
      const addedProduct = cart.find(
        (item) => item.product._id === product._id,
      );

      return (
        <ProductItem
          key={product._id}
          product={product}
          isInCart={!!addedProduct}
          wishList={wishList}
          cartProduct={addedProduct}
        />
      );
    });
  };

  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <AllProductsHeader />
          <div className="w-[270px]">
            <ControlContainer
              leftElement={
                <span className="bg-neutralGrayBg text-sm w-[50px]">
                  Sort by
                </span>
              }
              rightElement={
                <div className="px-4">
                  <Select
                    width={170}
                    options={sortOptions}
                    onChange={onSortChange}
                    value={sortValue}
                  />
                </div>
              }
            />
          </div>
          <div className="flex gap-2 block lg:hidden">
            <span>Filters</span>
            <FilterAltIcon className="" onClick={() => toggleSidebar(true)} />
          </div>
        </div>
        <div className="grid xl:grid-cols-[270px,1fr] lg:grid-cols-[250px,1fr] custom:grid-cols-1 md:grid-cols-1 gap-8 max-w-[1200px] mx-auto w-full">
          <AsideFilter />
          <div
            className={twMerge(
              total === 0
                ? "flex justify-center"
                : "flex flex-col gap-[34px] items-end",
            )}
          >
            {isProductsLoading ? <ProductPageSkeleton /> : renderProducts()}
          </div>
        </div>
        {total !== 0 ? (
          <div className="flex flex-col md:flex-row gap-6 w-full items-center">
            <div className="flex-1">
              <PaginationController
                page={showMorePage ? showMorePage : page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
            {lastDownloadedPage < totalPages ? (
              <Button className="flex gap-2 mx-auto" onClick={handleShowMore}>
                <span>Show more products</span>
                <img
                  src="/freshness-shop-fe/vector-button.svg"
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
        ) : null}
      </div>
      <FiterSidebar
        isOpen={isSidebarOpen}
        onClose={() => toggleSidebar(false)}
      />
    </>
  );
};
