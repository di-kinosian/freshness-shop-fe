import * as yup from "yup";
import { MESSAGES } from "../../constants/messages";
import { REGEX } from "../../constants/regex";

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(MESSAGES.VALIDATION.EMAIL_FORMAT)
    .matches(REGEX.EMAIL_DOMAIN, MESSAGES.VALIDATION.EMAIL_DOMAIN)
    .required(MESSAGES.VALIDATION.EMAIL_REQUIRED),

  password: yup
    .string()
    .required(MESSAGES.VALIDATION.PASSWORD_REQUIRED)
    .min(8, MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH)
    .matches(REGEX.PASSWORD_LOWERCASE, MESSAGES.VALIDATION.PASSWORD_LOWERCASE)
    .matches(REGEX.PASSWORD_UPPERCASE, MESSAGES.VALIDATION.PASSWORD_UPPERCASE)
    .matches(REGEX.PASSWORD_DIGITS, MESSAGES.VALIDATION.PASSWORD_DIGITS)
    .matches(
      REGEX.PASSWORD_SPECIAL_CHARACTERS,
      MESSAGES.VALIDATION.PASSWORD_SPECIAL_CHARACTERS,
    ),
});
