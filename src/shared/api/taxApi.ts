import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/authApi';

export interface Tax {
  id: number;
  name: string;
  rate: number;
}

export const taxApi = createApi({
  reducerPath: 'taxApi',
  tagTypes: ['Tax'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getTax: builder.query<Tax, void>({
      query: () => ({
        url: `/tax`,
        method: 'get',
      }),
      providesTags: ['Tax'],
    }),
    updateTax: builder.mutation<Tax, Tax>({
      query: (tax) => ({
        url: '/tax',
        method: 'put',
        data: tax,
      }),
      invalidatesTags: ['Tax'],
    }),
  }),
});

export const { useGetTaxQuery, useUpdateTaxMutation } = taxApi;
