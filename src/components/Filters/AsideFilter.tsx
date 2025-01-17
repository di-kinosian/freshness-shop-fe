import { useCallback, useEffect } from "react";
import { BrandFilter } from "./BrandFilter";
import { CategoryFilter } from "./Categories/CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { RatingFilter } from "./RatingFilter";
import { FilterKey, SelectedFilters } from "./types";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/app/hooks";
import {
  setSelectedFilters,
  fetchFilters,
  resetFilters,
  clearSearchValue,
  setSearchValue,
} from "../../redux/features/filters/filtersSlice";
import { FiltersCategories } from "../../redux/features/filters/types";
import { getAllProducts } from "../../redux/features/products/productThunks";
import { Filters } from "../../main/types/enums";

export const AsideFilter = () => {
  const dispatch: AppDispatch = useDispatch();
  const { availableFilters, selectedFilters } = useAppSelector(
    (state) => state.filters,
  );

  useEffect(() => {
    dispatch(fetchFilters());
  }, []);

  const handleFilterChange = useCallback(
    (key: FilterKey) =>
      (value: SelectedFilters[FilterKey]): void => {
        if (key === Filters.Category) {
          dispatch(clearSearchValue());
        }
        dispatch(setSelectedFilters({ [key]: value }));
        dispatch(getAllProducts());
      },
    [dispatch],
  );

  const handleReset = (): void => {
    dispatch(resetFilters());
    dispatch(setSearchValue(null));
    dispatch(getAllProducts());
  };

  return (
    <div className="hidden custom:hidden md:hidden lg:block">
      <div className="flex flex-col gap-8">
        <CategoryFilter
          onChange={handleFilterChange(Filters.Category)}
          value={selectedFilters.category || ""}
          categories={availableFilters?.categories as FiltersCategories[]}
        />
        <BrandFilter
          brands={availableFilters?.brands}
          onChange={handleFilterChange(Filters.Brands)}
          value={selectedFilters.brands}
        />
        <RatingFilter
          onChange={handleFilterChange(Filters.Rating)}
          value={selectedFilters.rating}
        />
        <PriceFilter
          onChange={handleFilterChange(Filters.Price)}
          value={selectedFilters.price}
          availableRange={availableFilters?.price}
        />
        <button onClick={handleReset} className="text-grayText font-bold">
          Reset
        </button>
      </div>
    </div>
  );
};
