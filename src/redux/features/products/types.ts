export interface AdditionalInformation {
  key: string;
  value: string | number;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  rating?: number;
  price: number;
  quantity: number;
  brand: string;
  country: string;
  images: string[];
  discount?: number;
  categoryId: string;
  subcategoryId: string;
  additionalInformation?: AdditionalInformation[];
}

export interface GetAllProductsPayload {
  page: number;
  limit: number;
  categoryId: string;
  brands?: string[];
  priceMin?: number;
  priceMax?: number;
  rating?: number[];
  sortField?: string | null;
  sortDirection?: string | null;
}

export interface GetProductPayload {
  _id: string;
}

export interface ProductsState {
  products: Product[];
  relatedProducts: Product[];
  total: number;
  page: number;
  limit: number;
  productError: string | null;
  product: Product | null;
  productsError: string | null;
  relatedProductsError: string | null;
  wishList: Product[];
  isWishListLoading: boolean;
  wishListError: string | null;
}
