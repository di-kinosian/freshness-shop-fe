import { useEffect, useState } from "react";
import { BrandFilter } from "./BrandFilter";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { RatingFilter } from "./RatingFilter";
import { PriceRange } from "./types";
import axios from "axios";
import { url } from "../../main/constants/common";

export const AsideFilter = () => {
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: 0,
    max: 1000,
  });
  const [availableRange, setAvailableRange] = useState<PriceRange>({
    min: 0,
    max: 1000,
  });
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const getFilters = async () => {
      try {
        const response = await axios.get(`${url}/products/filters`);
        setAvailableRange(response.data.price);
        setPriceRange(response.data.price);
        setBrands(response.data.brands);
      } catch (error) {
        console.log(error);
      }
    };
    getFilters();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <CategoryFilter />
      <BrandFilter brands={brands} />
      <RatingFilter />
      <PriceFilter
        onChange={setPriceRange}
        value={priceRange}
        availableRange={availableRange}
      />
    </div>
  );
};
