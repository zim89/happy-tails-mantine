import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BackendResponse, Order, Sort } from '../types/types';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  tagTypes: ['Orders'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    findMany: builder.query<
      BackendResponse<Order[]>,
      { page: number; limit: number; sort?: Sort }
    >({
      query: ({ page, limit, sort }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: limit.toString(),
        });

        if (sort) params.append('sort', sort.join(','));

        return `orders/all?${params}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ number: id }) => ({
                type: 'Orders' as const,
                id,
              })),
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),
  }),
});

export const { useFindManyQuery } = ordersApi;
