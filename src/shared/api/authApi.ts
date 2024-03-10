/*
'use server';
import { signIn } from 'next-auth/react';
import { AuthError } from 'next-auth';
import axios from 'axios';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const login = async (values: LoginFormData) => {
  try {
    await signIn('credentials', {
      username: values.email,
      password: values.password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
};

export const register = async (values: RegisterFormData) => {
  try {
    const user = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/register`,
      values
    );
    console.log(user);
  } catch (error) {}
};
*/
