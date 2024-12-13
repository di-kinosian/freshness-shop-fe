import { useDispatch } from "react-redux";
import { ControlSize } from "../../main/types/enums";
import { AppDispatch } from "../../redux/app/store";
import { ControlContainer } from "../ControlContainer/ControlContainer";
import { Select } from "../Select/Select";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector } from "../../main/hooks";
import { transformCategoriesToOptions } from "../../main/helpers";
import { useMemo } from "react";
import {
  setSearchCategory,
  setSearchValue,
} from "../../redux/features/filters/filtersSlice";
import { searchProducts } from "../../redux/features/products/productThunks";

export const Search = () => {
  const dispatch: AppDispatch = useDispatch();
  const { categories } = useAppSelector((state) => state.categories);
  const { searchValue, searchCategory } = useAppSelector(
    (state) => state.filters,
  );
  const categoryOptions = useMemo(
    () => transformCategoriesToOptions(categories),
    [categories],
  );

  const handleSearch = (): void => {
    if (searchValue) {
      dispatch(searchProducts({ searchValue }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchValue(e.target.value));
  };

  return (
    <div className="custom:w-[500px] w-[400px]">
      <ControlContainer
        size={ControlSize.SMALL}
        leftElement={
          <Select
            value={searchCategory as string}
            width={140}
            options={categoryOptions}
            onChange={(value: string) => dispatch(setSearchCategory(value))}
          />
        }
        rightElement={
          <div className="flex items-center gap-2 w-full pl-4">
            <input
              className="bg-neutralGrayBg outline-0 w-full"
              placeholder="Search product"
              onChange={handleInputChange}
              value={searchValue || ""}
            />
            <SearchIcon
              fontSize="small"
              className="cursor-pointer"
              onClick={handleSearch}
            />
          </div>
        }
      />
    </div>
  );
};
