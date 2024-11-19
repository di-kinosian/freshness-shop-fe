export interface PriceRange {
  min: number;
  max: number;
}

export interface FiltersCategories {
  id: string;
  name: string;
  productCount: number;
}

export interface Categories {
  categories: FiltersCategories[];
}

export interface SelectedFilters {
  category: string;
  brands: string[];
  price: PriceRange;
  rating: number[];
}

export type FilterKey = keyof SelectedFilters;
