import { RootState } from "../../app/store";

export const selectComments = (state: RootState) => state.comments.comments;
