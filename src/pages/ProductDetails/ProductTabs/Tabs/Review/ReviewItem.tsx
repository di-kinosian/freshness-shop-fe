import { Author, CommentResponce } from "@redux/features/comments/types";
import { formatDate } from "../../../../../main/helpers";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Popover } from "@components/Popover/Popover";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useCallback, useState } from "react";
import { deleteComment } from "@redux/features/comments/commentsSlice";
import { AppDispatch } from "@redux/app/store";
import { useDispatch } from "react-redux";

interface CommentProps {
  isOwn: boolean;
  author?: Author;
  comment: CommentResponce;
  onReplyClick?: (commentId: string) => void;
}

interface RepliesProps {
  profileId?: string;
  replies: CommentResponce[];
}

export const Comment = ({
  isOwn,
  comment,
  author,
  onReplyClick,
}: CommentProps) => {
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleMenuClick = (event: React.MouseEvent<SVGSVGElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = useCallback((): void => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleReviewDelete = (): void => {
    dispatch(deleteComment({ id: comment._id }));
  };

  return (
    <>
      <div className="flex flex-col gap-3 px-4 py-2 border border-separator rounded-2xl">
        <div className="w-full flex justify-between items-center">
          <span className="font-semibold">
            {author?.firstName} {author?.lastName}
          </span>
          <div className="text-sm text-grayText">
            {formatDate(comment.updatedAt)}
            {isOwn && (
              <MoreVertIcon
                className="text-neutralGreenBg"
                onClick={(event) => handleMenuClick(event)}
              />
            )}
          </div>
        </div>
        <span>{comment.text}</span>
        {onReplyClick && (
          <div
            className="flex gap-1 items-center text-neutralGreenBg"
            onClick={() => onReplyClick(comment._id)}
          >
            <SubdirectoryArrowRightIcon />
            <div>Answer</div>
          </div>
        )}
      </div>
      <Popover onClose={handleMenuClose} anchorEl={anchorEl} left={-24}>
        <div
          className="flex gap-2 px-6 py-2 border border-basicGray rounded-md"
          onClick={handleReviewDelete}
        >
          <DeleteOutlineIcon />
          <div>Delete review</div>
        </div>
      </Popover>
    </>
  );
};

export const Replies = ({ replies, profileId }: RepliesProps) => (
  <div className="pl-6 flex flex-col gap-3">
    {replies.map((reply) => {
      const isOwn = profileId === reply.user._id;
      return (
        <Comment
          key={reply._id}
          comment={reply}
          author={reply.user}
          isOwn={isOwn}
        />
      );
    })}
  </div>
);
