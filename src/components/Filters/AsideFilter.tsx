import { useEffect, useState } from "react";
import { BrandFilter } from "./BrandFilter";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { RatingFilter } from "./RatingFilter";
import { PriceRange } from "./types";
import axios from "axios";
import { url } from "../../main/constants/common";
import { initialRange } from "../../main/constants/filters.constants";

export const AsideFilter = () => {
  const [priceRange, setPriceRange] = useState<PriceRange>(initialRange);
  const [availableRange, setAvailableRange] =
    useState<PriceRange>(initialRange);

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
