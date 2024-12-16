export interface BillingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
  notes?: string;
  agreeToPolicy?: boolean;
  agreeToEmails?: boolean;
}
