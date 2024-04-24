export type Attributes = { [P in string]: string[] } | null;

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  registerDate: number[];
  roles: string[];
  attributes: Attributes;
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

export interface LoginResponse extends User {};


export interface VerifyEmailData extends LoginData {
  code: number | string;
}
