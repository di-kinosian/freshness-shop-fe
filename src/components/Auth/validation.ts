import * as yup from "yup";

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.com$/i,
      "Email must be a valid .com address",
    )
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
      /(?=.*[!@#$%^&*()_\-+=<>?{}[\]~`.,;:'"|\\].*[!@#$%^&*()_\-+=<>?{}[\]~`.,;:'"|\\])/,
      "Password must contain at least 2 special characters",
    ),
});
