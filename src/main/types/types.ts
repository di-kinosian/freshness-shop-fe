export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  isLoginLoading: boolean;
  loginError: string | null;
  isSignupLoading: boolean;
  signupError: string | null;
}

export interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface IUserLogin {
  accessToken: string | null;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AdditionalInformation {
  key: string;
  value: string | number;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  rating?: number;
  price: number;
  quantity: number;
  brand: string;
  country: string;
  images: string[];
  discount?: number;
  categoryId: string;
  subcategoryId: string;
  additionalInformation?: AdditionalInformation[];
}

export interface ProductCredentials {
  page: number;
  limit: number;
}

export interface ProductState {
  products: Product[] | null;
  total: number;
  page: number;
  limit: number;
  productError: string | null;
}

export interface AdditionalInfoType {
  key: string;
  value: string | number;
}
