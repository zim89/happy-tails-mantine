import { axiosBaseQuery } from '@/shared/api/authApi';
import { BackendResponse, Category, ID } from '../types/types';

import { createApi } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  tagTypes: ['Categories'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    categories: builder.query<BackendResponse<Category[]>, void>({
      query: () => ({ url: '/category', method: "get" }),
      providesTags: ['Categories'],
    }),
    addNewCategory: builder.mutation<
      Category,
      Partial<Category>
    >({
      query: (payload) => {
        return {
          url: '/category',
          method: 'POST',
          data: JSON.stringify({
            ...payload,
            path: `/${payload.name}`,
            description: `Category name: ${payload.name}`,
            overview: '',
          }),

          headers: {
            'Content-type': 'application/json',
          },
        };
      },
      invalidatesTags: ['Categories'],
    }),
    removeCategory: builder.mutation<void, { id: ID }>({
      query: (payload) => ({
        url: `/category/${payload.id}`,
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation<
      Category,
      { req: Partial<Category> }
    >({
      query: (payload) => ({
        url: '/category',
        method: 'put',
        data: payload.req,
        headers: {
          'Content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useCategoriesQuery,
  useAddNewCategoryMutation,
  useRemoveCategoryMutation,
  useUpdateCategoryMutation,
} = categoriesApi;