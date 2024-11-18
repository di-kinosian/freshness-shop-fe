import { PriceFilter } from "./PriceFilter";
import { RatingFilter } from "./RaitingFilter";

export const AsideFilter = () => {
  return (
    <div className="flex flex-col gap-8">
      <span className="text-lg font-semibold">Categories</span>
      <RatingFilter />
      <PriceFilter />
    </div>
  );
};
