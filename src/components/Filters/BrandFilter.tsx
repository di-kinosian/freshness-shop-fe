import { Checkbox } from "../Checkbox/Checkbox";
import { SelectedFilters } from "./types";

interface Props {
  brands?: string[];
  value: SelectedFilters["brands"];
  onChange: (value: SelectedFilters["brands"]) => void;
}

export const BrandFilter: React.FC<Props> = ({ brands, onChange, value }) => {
  const handleCheckboxChange =
    (brand: string) =>
    (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      onChange(
        checked
          ? [...value, brand.toString()]
          : value.filter((r) => r !== brand.toString()),
      );
    };

  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold text-lg">Brand</span>
      {brands?.map((brand, index) => (
        <div key={index} className="flex items-center gap-1">
          <Checkbox
            onChange={handleCheckboxChange(brand)}
            checked={value.includes(brand)}
          />
          <span>{brand}</span>
        </div>
      ))}
    </div>
  );
};
