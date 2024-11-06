import * as yup from "yup";
import { MESSAGES } from "../../constants/messages";
import { REGEX } from "../../constants/regex";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.com$/i;
const passwordRegex =
  /(?=.*[!@#$%^&*()_\-+=<>?{}[\]~`.,;:'"|\\].*[!@#$%^&*()_\-+=<>?{}[\]~`.,;:'"|\\])/;

export const loginValidationSchema = yup.object().shape({
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

export const signupValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),

  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),

  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegex, "Enter a valid .com email"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /(?=.*[a-z].*[a-z])/,
      "Password must contain at least 2 lowercase letters",
    )
    .matches(
      /(?=.*[A-Z].*[A-Z])/,
      "Password must contain at least 2 uppercase letters",
    )
    .matches(/(?=.*\d.*\d)/, "Password must contain at least 2 digits")
    .matches(
      passwordRegex,
      "Password must contain at least 2 special characters",
    ),

  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\+(\d{1,3})\d{9,14}$/,
      "Enter a valid phone number with country code",
    ),
});
