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
import { AxiosQueryError, ErrorData } from '@/shared/types/types';
import { API_URL } from '../constants/env.const';

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = {
      baseUrl: API_URL!,
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
    AxiosQueryError
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
      const err = axiosError as AxiosError<ErrorData>;
      let errorResponse: AxiosQueryError = {
        data: err.message, // Default message
      };

      if (err.response) {
        // If the error is due to HTTP response
        errorResponse = {
          status: err.response.status,
          data: err.response.data || err.message,
        };
      } else if (err.request) {
        // The request was made but no response was received
        errorResponse.data =
          'The request was made but no response was received';
      }
      return { error: errorResponse };
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
    resetPassword: builder.mutation<void, { email: string }>({
      query: (payload) => ({
        url: '/users/reset-password',
        method: 'post',
        data: payload,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    }),
    resetPasswordVerify: builder.mutation<
      void,
      {
        email: string;
        code: string;
        newPassword: string;
        confirmPassword: string;
      }
    >({
      query: (payload) => ({
        url: '/users/reset-password/verify',
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
    loginOauth: builder.mutation<LoginResponse, string>({
      query: (code) => ({
        url: '/login/oauth2/code/google',
        method: 'get',
        params: {
          code,
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
      providesTags: ['Auth'],
    }),
    sendVerificationCode: builder.mutation<void, void>({
      query: () => ({
        url: '/users/send-verification-email',
        method: 'post',
      }),
    }),
    // FIXME: Fix any type
    updateDetails: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/users/update',
        method: 'put',
        data: payload,
      }),
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authApi.util.updateQueryData('getUserInfo', undefined, (draft) => {
            Object.assign(draft, payload);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useResetPasswordVerifyMutation,
  useLoginMutation,
  useLoginOauthMutation,
  useLogoutMutation,
  useGetUserInfoQuery,
  useUpdateDetailsMutation,
  useSendVerificationCodeMutation,
} = authApi;
