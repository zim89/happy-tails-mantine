import axiosInstance from '@/shared/lib/interceptor';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import type { AxiosError, AxiosRequestConfig } from 'axios';

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  registerDate: number[];
  roles: string[];
}

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = {
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (payload) => ({
        url: '/users/register',
        method: 'post',
        data: payload,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (payload) => ({
        url: '/users/token',
        method: 'post',
        data: payload,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/user/logout',
        method: 'post',
      }),
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: '/user/info',
        method: 'get',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserInfoQuery,
} = authApi;
