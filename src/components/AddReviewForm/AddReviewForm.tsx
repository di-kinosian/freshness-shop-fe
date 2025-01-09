import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { reviewValidationSchema } from "./validation";
import {
  ButtonSize,
  ButtonVariant,
  ReviewFields,
} from "../../main/types/enums";
import { TextareaFormField } from "@components/FormComponents/TextareaFormField";
import { Button } from "@components/Button/Button";
import { AppDispatch } from "@redux/app/store";
import { useDispatch } from "react-redux";
import { createComments } from "@redux/features/comments/commentsSlice";

interface Props {
  onClose: () => void;
  productId: string;
  commentId?: string | null;
}

export const AddReviewForm = ({ onClose, productId, commentId }: Props) => {
  const { handleSubmit, control, getValues } = useForm({
    resolver: yupResolver(reviewValidationSchema),
  });
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = async () => {
    const data = getValues();
    await dispatch(
      createComments({
        productId,
        text: data.review,
        parentId: commentId,
      }),
    );
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6"
    >
      <TextareaFormField
        name={ReviewFields.Review}
        control={control}
        placeholder="Write the review"
      />
      <div className="w-full flex gap-4 justify-center">
        <Button type="submit" size={ButtonSize.SMALL}>
          Add review
        </Button>
        <Button
          color={ButtonVariant.SECONDARY}
          size={ButtonSize.SMALL}
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
