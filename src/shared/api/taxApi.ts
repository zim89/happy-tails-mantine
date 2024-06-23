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
    }),
  }),
});

export const { useGetTaxQuery } = taxApi;
