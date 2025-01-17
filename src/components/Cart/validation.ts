import * as yup from "yup";
import { MESSAGES } from "../../main/constants/messages";
import { REGEX } from "../../main/constants/regex";

export const billingValidationShema = yup.object().shape({
  firstName: yup
    .string()
    .required(MESSAGES.VALIDATION.FIRST_NAME_REQUIRED)
    .min(2, MESSAGES.VALIDATION.FIRST_NAME_MIN_LENGTH),
  lastName: yup
    .string()
    .required(MESSAGES.VALIDATION.LAST_NAME_REQUIRED)
    .min(2, MESSAGES.VALIDATION.LAST_NAME_MIN_LENGTH),
  email: yup
    .string()
    .required(MESSAGES.VALIDATION.EMAIL_REQUIRED)
    .matches(REGEX.EMAIL_DOMAIN, MESSAGES.VALIDATION.EMAIL_DOMAIN),
  phoneNumber: yup
    .string()
    .required(MESSAGES.VALIDATION.PHONE_NUMBER_REQUIRED)
    .matches(REGEX.PHONE_NUMBER, MESSAGES.VALIDATION.PHONE_NUMBER_FORMAT),
  address: yup
    .string()
    .required(MESSAGES.VALIDATION.ADDRESS_REQUIRED)
    .min(5, MESSAGES.VALIDATION.ADDRESS_MIN_LENGTH),
  city: yup.string().required(MESSAGES.VALIDATION.TOWN_CITY_REQUIRED),
  country: yup.string().required(MESSAGES.VALIDATION.STATE_COUNTRY_REQUIRED),
  zipCode: yup
    .string()
    .required(MESSAGES.VALIDATION.ZIP_POSTAL_CODE_REQUIRED)
    .matches(REGEX.ZIP_POSTAL_CODE, MESSAGES.VALIDATION.ZIP_POSTAL_CODE_FORMAT),
  notes: yup.string().optional(),
  agreeToPolicy: yup
  .boolean()
  .oneOf([true], MESSAGES.VALIDATION.AGREEMENT_REQUIRED),
  agreeToEmails: yup.boolean().optional(),
});
