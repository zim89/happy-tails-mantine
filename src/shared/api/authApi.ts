import { signIn } from 'next-auth/react';

export interface LoginFormData {
  email: string;
  password: string;
}

export const login = async (formData: LoginFormData) => {
  const { email, password } = formData;

  try {
    await signIn('credentials', {
      email,
      password,
      // redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    throw error;
  }
};
