import { CommentResponce } from "@redux/features/comments/types";
import { formatDate } from "../../../../../main/helpers";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface CommentProps {
  comment: CommentResponce;
  onMenuClick: (event: React.MouseEvent<SVGSVGElement>, id: string) => void;
  onReplyClick?: (commentId: string) => void;
}

export const Comment = ({
  comment,
  onMenuClick,
  onReplyClick,
}: CommentProps) => (
  <div className="flex flex-col gap-3 px-4 py-2 border border-separator rounded-2xl">
    <div className="w-full flex justify-between items-center">
      <span className="font-semibold">User name</span>
      <div className="text-sm text-grayText">
        {formatDate(comment.updatedAt)}
        <MoreVertIcon
          className="text-neutralGreenBg"
          onClick={(event) => onMenuClick(event, comment._id)}
        />
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
);

export const Replies = ({
  replies,
  onMenuClick,
}: {
  replies: CommentResponce[];
  onMenuClick: (event: React.MouseEvent<SVGSVGElement>, id: string) => void;
}) => (
  <div className="pl-6 flex flex-col gap-3">
    {replies.map((reply) => (
      <Comment key={reply._id} comment={reply} onMenuClick={onMenuClick} />
    ))}
  </div>
);
