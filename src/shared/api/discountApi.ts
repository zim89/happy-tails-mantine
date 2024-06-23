import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/authApi';

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
    }),
  }),
});

export const { useGetDiscountByCodeQuery } = discountApi;
