export interface FiltersCategories {
  id: string;
  name: string;
  productCount: number;
}

export interface Filters {
  brands: string[];
  categories: FiltersCategories[];
  price: { min: number; max: number };
}

export interface SelectedFilters {
  brands: string[];
  category: string;
  price: { min: number; max: number };
  rating: number[];
}

export interface FiltersState {
  availableFilters: Filters | null;
  selectedFilters: SelectedFilters;
  filtersError: string | null;
}
