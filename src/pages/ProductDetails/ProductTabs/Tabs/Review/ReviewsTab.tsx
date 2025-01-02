import { CommentResponce } from "@redux/features/comments/types";
import { Button } from "@components/Button/Button";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useDialog } from "@components/Dialog/context/DialogContext";
import { AddReviewForm } from "@components/AddReviewForm/AddReviewForm";
import { Comment, Replies } from "./ReviewItem";
import { useAppSelector } from "@redux/app/hooks";
import { selectProfile } from "@redux/features/auth/selectors";

interface Props {
  productId: string;
  comments: CommentResponce[];
  handleOpenReviewDialog: () => void;
}

export const ReviewsTab = ({
  comments,
  handleOpenReviewDialog,
  productId,
}: Props) => {
  const { openDialog, closeDialog } = useDialog();
  const profile = useAppSelector(selectProfile);

  const handleOpenReplyDialog = (commentId: string): void => {
    openDialog({
      title: "Reply",
      content: (
        <AddReviewForm
          onClose={closeDialog}
          productId={productId}
          commentId={commentId}
        />
      ),
      className: "w-fit xs:w-[300px] customSm:w-[400px]",
    });
  };

  return (
    <div className="w-full">
      {comments.length ? (
        <div className="flex flex-col gap-3">
          <Button
            variant="text"
            className="ml-auto"
            onClick={handleOpenReviewDialog}
          >
            <div className="font-bold flex gap-1 items-center">
              <RateReviewIcon />
              <span className="underline">Add comment</span>
            </div>
          </Button>
          <div className="w-full max-h-[500px] overflow-auto flex flex-col gap-3">
            {comments.map((comment) => {
              const isOwnComment = profile?._id === comment.user._id;
              return (
                <div key={comment._id} className="flex flex-col gap-3">
                  <Comment
                    isOwn={isOwnComment}
                    author={comment.user}
                    comment={comment}
                    onReplyClick={handleOpenReplyDialog}
                  />
                  {comment.replies && (
                    <Replies
                      profileId={profile?._id}
                      replies={comment.replies}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-3">
          <Button
            variant="text"
            className="ml-auto"
            onClick={handleOpenReviewDialog}
          >
            <div className="font-bold flex gap-1 items-center">
              <RateReviewIcon />
              <span className="underline">Add comment</span>
            </div>
          </Button>
          <div className="w-full relative flex flex-col items-center justify-center">
            <SpeakerNotesOffIcon sx={{ fontSize: 250, opacity: 0.1 }} />
            <span className="z-10 absolute top-[93px] text-3xl font-semibold text-grayText opacity-60">
              No comments yet
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
