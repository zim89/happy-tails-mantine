import axiosInstance from '@/shared/lib/interceptor';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import type { AxiosError, AxiosRequestConfig } from 'axios';
import {
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
  VerifyEmailData,
} from '@/shared/types/auth.types';

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
    register: builder.mutation<RegisterResponse, RegisterData>({
      query: (payload) => ({
        url: '/users/register',
        method: 'post',
        data: payload,
      }),
    }),
    verifyEmail: builder.mutation<LoginResponse, VerifyEmailData>({
      query: (payload) => ({
        url: '/users/verify-email',
        method: 'post',
        data: payload,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    }),
    login: builder.mutation<LoginResponse, LoginData>({
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
    // FIXME: Fix any type
    updateDetails: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/users/update',
        method: 'put',
        data: payload,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserInfoQuery,
  useUpdateDetailsMutation,
} = authApi;
