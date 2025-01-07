import * as yup from "yup";
import { MESSAGES } from "../../main/constants/messages";

export const reviewValidationSchema = yup.object().shape({
  review: yup
    .string()
    .required(MESSAGES.REVIEW.REVIEW_IS_REQUIRED)
    .min(2, MESSAGES.REVIEW.REVIEW_MIN_LENGTH),
});
