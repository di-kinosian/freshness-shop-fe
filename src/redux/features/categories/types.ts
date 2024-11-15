export interface SubCategory {
  name: string;
  _id: string;
  parentCategoryId: string;
}

export interface Category {
  name: string;
  subCategories: SubCategory[];
  _v?: number;
  _id: string;
}

export interface CategoryState {
  categories: Category[] | null;
  categoriesError: string | null;
}
