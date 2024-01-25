import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackendResponse, Product } from '../types/types';

export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    findAllByCategory: builder.query<
      BackendResponse<Product[]>,
      { page: number; limit: number; id: number }
    >({
      query: ({ page, limit, id }) =>
        `product?categoryId=${id}&page=${page}&size=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({
                type: 'Products' as const,
                id,
              })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    findAllByName: builder.query<
      BackendResponse<Product[]>,
      { page: number; limit: number; value: string }
    >({
      query: ({ page, limit, value }) =>
        `products/search?name=${value}&page=${page}&size=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({
                type: 'Products' as const,
                id,
              })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    findOne: builder.query({
      query: (id = 1) => `products/${id}`,
    }),
    create: builder.mutation({
      query(body) {
        return {
          url: 'products',
          method: 'POST',
          body,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    update: builder.mutation({
      query({ body }) {
        return {
          url: `products`,
          method: 'PUT',
          body,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    remove: builder.mutation({
      query(id) {
        return {
          url: `products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useFindAllByCategoryQuery,
  useFindAllByNameQuery,
  useFindOneQuery,
  useCreateMutation,
  useUpdateMutation,
  useRemoveMutation,
} = productApi;
