import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://happytails-backend.lav.net.ua/happytails/api',
  }),
  endpoints: (builder) => ({
    findAll: builder.query({
      query: ({ page, limit }) => `products?page=${page}&size=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }: any) => ({
                type: 'Products',
                id,
              })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    findAllByCategory: builder.query({
      query: ({ page, limit, id }) =>
        `product?categoryId=${id}&page=${page}&size=${limit}`,
      providesTags: (result) =>
        result
          ? [
              result.content.map(({ id }: any) => ({ type: 'Products', id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    findAllByName: builder.query({
      query: ({ page, limit, value }) =>
        `products/search?name=${value}&page=${page}&size=${limit}`,
      providesTags: (result) =>
        result
          ? [
              result.content.map(({ id }: any) => ({ type: 'Products', id })),
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
