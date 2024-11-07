export const REGEX = {
  EMAIL_DOMAIN: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.com$/i,
  PASSWORD_LOWERCASE: /(?=.*[a-z].*[a-z])/,
  PASSWORD_UPPERCASE: /(?=.*[A-Z].*[A-Z])/,
  PASSWORD_DIGITS: /(?=.*\d.*\d)/,
  PASSWORD_SPECIAL_CHARACTERS:
    /(?=.*[!@#$%^&*()_\-+=<>?{}[\]~`.,;:'"|\\].*[!@#$%^&*()_\-+=<>?{}[\]~`.,;:'"|\\])/,
};
