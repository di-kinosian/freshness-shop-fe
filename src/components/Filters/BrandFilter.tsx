import { useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";

interface Props {
  brands: string[];
}

export const BrandFilter: React.FC<Props> = ({ brands }) => {
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);

  const handleCheckboxChange =
    (value: string) =>
    (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setSelectedBrand((prev) =>
        checked
          ? [...prev, value.toString()]
          : prev.filter((r) => r !== value.toString()),
      );
    };

  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold text-lg">Brand</span>
      {brands.map((brand, index) => (
        <div key={index} className="flex items-center gap-1">
          <Checkbox
            onChange={handleCheckboxChange(brand)}
            checked={selectedBrand.includes(brand)}
          />
          <span>{brand}</span>
        </div>
      ))}
    </div>
  );
};
