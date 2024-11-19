import { useEffect } from "react";
import { AppDispatch } from "../../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../main/hooks";
import { getAllCategories } from "../../../redux/features/categories/categoriesSlice";

export const Categories = () => {
  const dispatch: AppDispatch = useDispatch();
  const { categories } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <div className="h-14 flex justify-around items-center bg-neutralGrayBg w-full max-w-[1200px] mx-auto">
      {categories?.map((category) => (
        <div
          className="flex gap-1 items-center cursor-pointer"
          key={category._id}
        >
          <div className="text-black font-medium">{category.name}</div>
          <img src="/vector.svg" alt="" className="w-2.5 h-2.5" />
        </div>
      ))}
    </div>
  );
};
