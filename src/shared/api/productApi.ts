import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackendResponse, Product, Sort } from '../types/types';

export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    findAll: builder.query<
      BackendResponse<Product[]>,
      {
        page: number;
        limit: number;
        sort?: Sort;
      }
    >({
      query: ({ page, limit, sort }) =>
        `products?page=${page}&size=${limit}${
          sort ? '&sort=' + sort[0] + ',' + sort[1] : ''
        }`,
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
    findAllByCategory: builder.query<
      BackendResponse<Product[]>,
      {
        page: number;
        limit: number;
        id: number;
        sort?: Sort;
      }
    >({
      query: ({ page, limit, id, sort }) =>
        `product?categoryId=${id}&page=${page}&size=${limit}${
          sort ? '&sort=' + sort[0] + ',' + sort[1] : ''
        }`,
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
  useFindAllQuery,
  useFindAllByCategoryQuery,
  useFindAllByNameQuery,
  useFindOneQuery,
  useCreateMutation,
  useUpdateMutation,
  useRemoveMutation,
} = productApi;
