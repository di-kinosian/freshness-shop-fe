import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Comment,
  CommentResponce,
  CommentStore,
  DeleteCommentPayload,
  UpdateCommentPayload,
} from "./types";
import { ThunkRejectValue } from "@redux/types";
import api from "../../../config/axios";
import { RootState } from "../../app/store";
import { handleAxiosError } from "../utils/handleThunkError";

const initialState: CommentStore = {
  comments: [],
  commentsError: null,
  isCommentsLoading: false,
  createdComment: null,
  updatedComment: null,
};

export const getComments = createAsyncThunk<
  CommentResponce[],
  { productId: string },
  ThunkRejectValue
>("comments/getComments", async (payload, thunkAPI) => {
  try {
    const response = await api.get(`/comment`, {
      params: { productId: payload.productId },
    });

    return response.data;
  } catch (error) {
    return handleAxiosError(error, thunkAPI);
  }
});

export const createComments = createAsyncThunk<
  CommentResponce,
  Comment,
  ThunkRejectValue
>("comments/createComments", async (payload, thunkAPI) => {
  try {
    const response = await api.post("/comment", payload);
    thunkAPI.dispatch(getComments({ productId: payload.productId }));

    return response.data;
  } catch (error) {
    return handleAxiosError(error, thunkAPI);
  }
});

export const updateComment = createAsyncThunk<
  Comment,
  UpdateCommentPayload,
  ThunkRejectValue
>("comments/updateComment", async (payload, thunkAPI) => {
  try {
    const response = await api.put(
      `/comment/${payload.id}`,
      payload.updatedText,
    );

    return response.data;
  } catch (error) {
    return handleAxiosError(error, thunkAPI);
  }
});

export const deleteComment = createAsyncThunk<
  void,
  DeleteCommentPayload,
  ThunkRejectValue
>("comments/deleteComment", async (payload, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const productId = state.product.product?._id;
  try {
    await api.delete(`/comment/${payload.id}`);
    if (productId) {
      thunkAPI.dispatch(getComments({ productId: productId }));
    }
  } catch (error) {
    return handleAxiosError(error, thunkAPI);
  }
});

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.commentsError = null;
        state.isCommentsLoading = false;
      })
      .addCase(getComments.pending, (state) => {
        state.commentsError = null;
        state.isCommentsLoading = true;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.commentsError = action.payload || "Failed to fetch comments";
        state.isCommentsLoading = false;
      })
      .addCase(createComments.fulfilled, (state, action) => {
        state.createdComment = action.payload;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.updatedComment = action.payload;
      });
  },
});

export default commentsSlice.reducer;
