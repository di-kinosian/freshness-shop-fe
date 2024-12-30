export interface Comment {
  productId: string;
  text: string;
  parentId?: string | null;
}

export interface Author {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface CommentResponce {
  productId: string;
  userId: string;
  text: string;
  parentId: string | null;
  isUpdated: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: Author;
  replies?: Omit<CommentResponce, "replies">[];
}

export interface CommentStore {
  comments: CommentResponce[] | [];
  commentsError: string | null;
  isCommentsLoading: boolean;
  createdComment: Comment | null;
  updatedComment: Comment | null;
}

export interface UpdateCommentPayload {
  updatedText: string;
  id: string;
}

export interface DeleteCommentPayload {
  id: string;
}
