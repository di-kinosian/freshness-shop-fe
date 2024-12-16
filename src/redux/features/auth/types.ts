export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  wishList: string[];
};

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
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
  wishList?: string[];
}

export interface IUserLogin {
  accessToken: string | null;
  refreshToken: string | null;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
