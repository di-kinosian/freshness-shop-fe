import { RootState } from "../../app/store";

export const selectCart = (state: RootState) => state.cart.cart;
export const selectIsCartLoading = (state: RootState) =>
  state.cart.isCartLoading;
