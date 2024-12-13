import { RootState } from "../../app/store";

export const selectProduct = (state: RootState) => state.product.product;
export const selectProducts = (state: RootState) => state.product.products;
export const selectRelatedProducts = (state: RootState) =>
  state.product.relatedProducts;
export const selectTotal = (state: RootState) => state.product.total;
