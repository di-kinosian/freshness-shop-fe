import { twMerge } from "tailwind-merge";
import { FiltersCategories, SelectedFilters } from "../types";
import { Bage } from "../../Bage/Bage";

interface Props {
  categories: FiltersCategories[];
  value: SelectedFilters["category"];
  onChange: (value: SelectedFilters["category"]) => void;
}

export const CategorySection: React.FC<Props> = ({
  categories,
  value,
  onChange,
}) => {
  const handleSelectCategory = (id: string): void => {
    onChange(value === id ? "" : id);
  };
  return (
    <>
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
          <Bage>{category.productCount}</Bage>
        </div>
      ))}
    </>
  );
};
