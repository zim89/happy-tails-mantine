import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/authApi';
import { BackendResponse } from '../types/types';

export interface Discount {
  id: number;
  code: string;
  discount: number;
  minPrice: number;
  beginningDate: number;
  expirationDate: number;
}

export interface DiscountWithErrors {
  timestamp: number;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface PostDiscount extends Omit<Discount, 'id' | 'code'> {}
export interface UpdateDiscount extends Discount {}
export interface DeleteDiscountCode extends Pick<Discount, 'id'> {}

export const discountApi = createApi({
  reducerPath: 'discountApi',
  tagTypes: ['Discount'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getDiscountByCode: builder.query<
      Discount | DiscountWithErrors,
      { code: string }
    >({
      query: ({ code }) => ({
        url: `/discount/${code}`,
        method: 'get',
      }),
      providesTags: ['Discount'],
    }),
    createDiscountCode: builder.mutation<Discount, PostDiscount>({
      query: (params) => ({
        url: '/discount',
        method: 'post',
        data: params,
      }),
      invalidatesTags: ['Discount'],
    }),
    deleteDiscountCode: builder.mutation<void, DeleteDiscountCode>({
      query: ({ id }) => ({
        url: `/discount/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Discount'],
    }),
    findMany: builder.query<BackendResponse<Discount[]>, void>({
      query: () => ({
        url: '/discount',
        method: 'get',
      }),
      providesTags: ['Discount'],
    }),
    updateDiscountCode: builder.mutation<Discount, UpdateDiscount>({
      query: (params) => ({
        url: '/discount',
        method: 'put',
        data: params,
      }),
      invalidatesTags: ['Discount'],
    }),
  }),
});

export const {
  useGetDiscountByCodeQuery,
  useCreateDiscountCodeMutation,
  useDeleteDiscountCodeMutation,
  useFindManyQuery,
  useUpdateDiscountCodeMutation,
} = discountApi;
