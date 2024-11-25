import { useCallback, useEffect } from "react";
import { BrandFilter } from "./BrandFilter";
import { CategoryFilter } from "./Categories/CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { RatingFilter } from "./RatingFilter";
import { FilterKey, SelectedFilters } from "./types";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../main/hooks";
import {
  setSelectedFilters,
  fetchFilters,
  removeSelectedFilters,
} from "../../redux/features/filters/filtersSlice";
import { FiltersCategories } from "../../redux/features/filters/types";

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
        dispatch(setSelectedFilters({ [key]: value }));
      },
    [dispatch],
  );

  const handleReset = (): void => {
    dispatch(removeSelectedFilters());
  };

  return (
    <div className="flex flex-col gap-8">
      <CategoryFilter
        onChange={handleFilterChange("category")}
        value={selectedFilters.category || ""}
        categories={availableFilters?.categories as FiltersCategories[]}
      />
      <BrandFilter
        brands={availableFilters?.brands}
        onChange={handleFilterChange("brands")}
        value={selectedFilters.brands || []}
      />
      <RatingFilter
        onChange={handleFilterChange("rating")}
        value={selectedFilters.rating || []}
      />
      <PriceFilter
        onChange={handleFilterChange("price")}
        value={selectedFilters.price}
        availableRange={availableFilters?.price}
      />
      <button onClick={handleReset} className="text-grayText font-bold">
        Reset
      </button>
    </div>
  );
};
