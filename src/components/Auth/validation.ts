import * as yup from "yup";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.com$/i;
const passwordRegex =
  /(?=.*[!@#$%^&*()_\-+=<>?{}[\]~`.,;:'"|\\].*[!@#$%^&*()_\-+=<>?{}[\]~`.,;:'"|\\])/;

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .matches(emailRegex, "Email must be a valid .com address")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
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
    .matches(/(?=.*\d.*\d)/, "Password must contain at least 2 digits"),
    // .matches(
    //   passwordRegex,
    //   "Password must contain at least 2 special characters",
    // ),

  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\+(\d{1,3})\d{9,14}$/,
      "Enter a valid phone number with country code",
    ),
});
