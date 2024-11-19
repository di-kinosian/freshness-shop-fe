import { twMerge } from "tailwind-merge";
import { FiltersCategories, SelectedFilters } from "./types";

interface Props {
  value: SelectedFilters["category"];
  onChange: (value: SelectedFilters["category"]) => void;
  categories: FiltersCategories[];
}

export const CategoryFilter: React.FC<Props> = ({
  categories,
  onChange,
  value,
}) => {
  const handleSelectCategory = (id: string): void => {
    onChange(value === id ? "" : id);
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold text-lg">Categories</span>
      {categories?.map((category) => (
        <div
          key={category.id}
          className={twMerge(
            "flex justify-between items-center",
            value === category.id
              ? "font-bold text-neutralGreenBg"
              : "text-black",
          )}
          onClick={() => handleSelectCategory(category.id)}
        >
          <div>{category.name}</div>
          <div className="text-neutralGreenBg font-semibold px-4 bg-lightGreen rounded-full">
            {category.productCount}
          </div>
        </div>
      ))}
    </div>
  );
};
