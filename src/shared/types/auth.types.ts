type Address = {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  company?: string;
  country: string;
  phoneNumber: string;
  state?: string;
  zip: string;
};

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  registerDate: number[];
  roles: string[];
  billingAddress: Address;
  shippingAddress: Address;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse extends User {}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse extends User {}

export interface VerifyEmailData extends LoginData {
  code: number | string;
}
