import { FiltersCategories, SelectedFilters } from "../types";
import { CategorySection } from "./CategorySection";

interface Props {
  value: SelectedFilters["category"];
  onChange: (value: SelectedFilters["category"]) => void;
  categories: FiltersCategories[];
}

export const CategoryFilter: React.FC<Props> = ({
  categories,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold text-lg">Categories</span>
      <CategorySection
        categories={categories}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
