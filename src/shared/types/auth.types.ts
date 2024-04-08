export interface Session {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
}

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

export interface RegisterResponse {
  accessTokenResponse: Session;
  userDTO: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessTokenResponse: Session;
  userDTO: User;
}

export interface VerifyEmailData extends LoginData {
  code: number | string;
}
