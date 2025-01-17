import { Product } from "../products/types";

export interface Cart {
  product: Product;
  quantity: number;
}

export interface CartState {
  cart: Cart[];
  isCartLoading: boolean;
  cartError: string | null;
  addToCartError: string | null;
  deleteFromCartError: string | null;
  editQuantityError: string | null;
}

export interface CartPayload {
  productId: string;
  quantity: number;
}
