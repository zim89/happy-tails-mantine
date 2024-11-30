import { axiosBaseQuery } from '@/shared/api/authApi';
import { BackendResponse, Category, ID, Sort } from '../types/types';
import { createApi } from '@reduxjs/toolkit/query/react';

import { DEFAULT_CATEGORY_IMAGE } from '@/shared/lib/constants';

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
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          categoriesApi.util.updateQueryData('categories', {}, (draft) => {
            draft.content.unshift({
              id: Date.now(),
              name: `${payload.name}`,
              title: `${payload.title}`,
              productCount: 0,
              imgSrc: DEFAULT_CATEGORY_IMAGE,
              updatedAt: null,
              createdAt: Date.now(),
              path: '/',
              coordinateOnBannerY: 0,
              coordinateOnBannerX: 0,
              description: '',
              overview: 'EMPTY',
            });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
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
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          categoriesApi.util.updateQueryData('categories', {}, (draft) => {
            draft.content = draft.content.filter(
              (category) => category.id !== payload.id
            );
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          categoriesApi.util.updateQueryData('categories', {}, (draft) => {
            const category = draft.content.find(
              (cat) => cat.id === payload.req.id
            );
            if (category) {
              Object.assign(category, payload.req);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
