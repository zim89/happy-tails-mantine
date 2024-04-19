import axios from 'axios';
import { BackendResponse } from '../types/types';

type ID = string | number;

export type Category = {
  id: number;
  name: string;
  title: string;
  description: string;
  overview: string;
  path: string;
  productCount: number;
  imgSrc: null | string;
  updatedAt: number | null;
  createdAt: number;
  coordinateOnBannerX: number;
  coordinateOnBannerY: number;
};

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  tagTypes: ['Categories'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    categories: builder.query<BackendResponse<Category[]>, void>({
      query: () => '/category',
      providesTags: ['Categories'],
    }),
    addNewCategory: builder.mutation<
      Category,
      Partial<Category> & { access_token: string }
    >({
      query: (payload) => {
        return {
          url: '/category',
          method: 'POST',
          body: JSON.stringify({
            name: payload.name,
            title: payload.name,
            path: `/${payload.name}`,
            description: `Category name: ${payload.name}`,
            overview: '',
            imgSrc: null,
          }),

          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${payload.access_token}`,
          },
        };
      },
      invalidatesTags: ['Categories'],
    }),
    removeCategory: builder.mutation<void, { id: ID; access_token: string }>({
      query: (payload) => ({
        url: `/category/${payload.id}`,
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${payload.access_token}`,
        },
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation<
      Category,
      { req: Partial<Category>; access_token: string }
    >({
      query: (payload) => ({
        url: '/category',
        method: 'PUT',
        body: payload.req,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${payload.access_token}`,
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

export const getAllCategories = async () => {
  try {
    const res = await axios.get<BackendResponse<Category[]>>(`${process.env.NEXT_PUBLIC_BASE_URL}/category`);
    const categories: Category[] = res.data.content;
    return categories;
  } catch (err) {
     throw err;
  }
};
