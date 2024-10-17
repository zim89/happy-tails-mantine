import { axiosBaseQuery } from '@/shared/api/authApi';
import { BackendResponse, Category, ID, Sort } from '../types/types';

import { createApi } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  tagTypes: ['Categories'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    categories: builder.query<
      BackendResponse<Category[]>,
      { page?: number; limit?: number; sort?: Sort }
    >({
      query: ({ sort = ['asc'], page = 0, limit = 20 }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: limit.toString(),
        });

        if (sort) params.append('sort', sort.join(','));
        return {
          url: '/category',
          method: 'get',
          params,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({
                type: 'Categories' as const,
                id,
              })),
              'Categories',
            ]
          : ['Categories'],
    }),
    addNewCategory: builder.mutation<Category, Partial<Category>>({
      query: (payload) => {
        return {
          url: '/category',
          method: 'POST',
          data: {
            ...payload,
            overview: 'EMPTY',
          },

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
    updateCategory: builder.mutation<Category, { req: Partial<Category> }>({
      query: (payload) => ({
        url: '/category',
        method: 'put',
        data: { ...payload.req, overview: payload.req.overview || 'EMPTY' },
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
