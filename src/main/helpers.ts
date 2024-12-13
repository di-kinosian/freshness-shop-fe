import { Category } from "../redux/features/categories/types";
import { Country } from "../redux/features/countries/types";

export const formatMoney = (amount: number): string => {
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Input must be a valid number");
  }

  const formattedAmount = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${formattedAmount} USD`;
};

export const calculateOriginalPrice = (
  discountedPrice: number,
  discountPercentage: number,
): string => {
  if (discountPercentage < 0 || discountPercentage >= 100) {
    throw new Error("Discount percentage must be between 0 and 100.");
  }

  const amount = discountedPrice / (1 - discountPercentage / 100);
  const formattedAmount = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedAmount;
};

export const transformCategoriesToOptions = (
  categories: Category[],
): { value: string; label: string }[] => {
  return categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));
};

export const transformCountriesToOptions = (
  countries: Country[],
): { value: string; label: string }[] => {
  return countries.map((country) => ({
    value: country.name.toLowerCase(),
    label: country.name,
  }));
};

export const transformCitiesToOptions = (
  cities: string[],
): { value: string; label: string }[] => {
  return cities.map((city) => ({
    value: city.toLowerCase(),
    label: city,
  }));
};
