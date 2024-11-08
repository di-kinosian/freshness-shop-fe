export const MESSAGES = {
  VALIDATION: {
    FIRST_NAME_REQUIRED: "First name is required",
    FIRST_NAME_MIN_LENGTH: "First name must be at least 2 characters",

    LAST_NAME_REQUIRED: "Last name is required",
    LAST_NAME_MIN_LENGTH: "Last name must be at least 2 characters",

    EMAIL_FORMAT: "Invalid email format",
    EMAIL_DOMAIN: "Email must be a valid .com address",
    EMAIL_REQUIRED: "Email is required",

    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters",
    PASSWORD_LOWERCASE: "Password must contain at least 2 lowercase letters",
    PASSWORD_UPPERCASE: "Password must contain at least 2 uppercase letters",
    PASSWORD_DIGITS: "Password must contain at least 2 digits",
    PASSWORD_SPECIAL_CHARACTERS:
      "Password must contain at least 2 special characters",

    PHONE_NUMBER_REQUIRED: "Phone number is required",
    PHONE_NUMBER_FORMAT: "Enter a valid phone number with country code",
  },
  ERROR: {
    ACCOUNT_NOT_FOUND: "Account not found. Please sign up.",
    LOGIN_FAILED: "Login failed. Please try again later.",
    ACCOUNT_ALREADY_EXISTS: "An account with this email already exists.",
    SIGNUP_FAILED: "Signup failed. Please try again later.",
    NETWORK_ERROR: "Network error. Please check your connection.",
  },
};
