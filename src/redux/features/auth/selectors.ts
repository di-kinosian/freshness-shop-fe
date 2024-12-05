import { RootState } from "../../app/store";

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectWishList = (state: RootState) => state.auth.user?.wishList;
