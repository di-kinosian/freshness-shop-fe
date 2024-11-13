export const REGEX = {
  EMAIL_DOMAIN: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.com$/i,
  PASSWORD: {
    LOWERCASE: /(?=.*[a-z].*[a-z])/,
    UPPERCASE: /(?=.*[A-Z].*[A-Z])/,
    DIGITS: /(?=.*\d.*\d)/,
    SPECIAL_CHARACTERS:
      /(?=.*[!@#$%^&*()_\-+=<>?{}[\]~`.,;:'"|\\].*[!@#$%^&*()_\-+=<>?{}[\]~`.,;:'"|\\])/,
  },
  PHONE_NUMBER: /^\+(\d{1,3})\d{9,14}$/,
};
