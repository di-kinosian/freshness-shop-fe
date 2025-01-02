import React, { useCallback, useEffect, useState } from "react";
import { AppDispatch } from "../../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/app/hooks";
import { getAllCategories } from "../../../redux/features/categories/categoriesSlice";
import { Popover } from "../../Popover/Popover";
import { CategoryItem } from "./CategoryItem";
import { selectCategories } from "../../../redux/features/categories/selectors";

export const Categories = () => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useAppSelector(selectCategories);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    categoryId: string,
  ): void => {
    setAnchorEl(event.currentTarget);
    setActiveCategoryId(categoryId);
  };

  const handleClose = useCallback((): void => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const subCategories =
    categories.find((category) => category._id === activeCategoryId)
      ?.subCategories || [];

  return (
    <>
      <div className="h-fit-content sm:h-14 flex gap-4 justify-start sm:justify-around items-center flex-wrap gap-4 justify-center bg-neutralGrayBg w-full max-w-[1200px] mx-auto">
        {categories?.map((category) => (
          <CategoryItem
            category={category}
            handleClick={handleClick}
            key={category._id}
          />
        ))}
      </div>
      <Popover onClose={handleClose} anchorEl={anchorEl} left={-24}>
        <div className="px-6 py-2 bg-neutralGrayBg min-w-32">
          {subCategories?.length ? (
            <ul className="space-y-2">
              {subCategories?.map((subCategory) => (
                <li key={subCategory._id} className="cursor-pointer">
                  {subCategory.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">
              This category does not have subcategories yet.
            </div>
          )}
        </div>
      </Popover>
    </>
  );
};
