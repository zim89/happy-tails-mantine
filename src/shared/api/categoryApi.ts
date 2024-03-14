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
};

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  tagTypes: ['Categories'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL
  }),
  endpoints: builder => ({
    categories: builder.query<BackendResponse<Category[]>, void>({
      query: () => "/category",
      providesTags: ["Categories"],
    }),
    addNewCategory: builder.mutation<Category, Partial<Category> & { access_token: string }>({
      query: payload => {

        return {
        url: "/category",
        method: "POST",
        body: JSON.stringify({
          name: payload.name,
          title: payload.name,
          path: "path",
          description: "Test description",
          overview: "Test overview",
          imgSrc: payload.imgSrc,
        }),
        
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${payload.access_token}`
        },
      }},
      invalidatesTags: ["Categories"]
    }),
    removeCategory: builder.mutation<Category, ID>({
      query: payload => ({
        url: `/category/${payload}`,
        method: "DELETE",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ["Categories"]
    }),
    updateCategory: builder.mutation<Category, Partial<Category>>({
      query: payload => ({
        url: "/category/",
        method: "PUT",
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ["Categories"]
    }),
  }),
});

export const { useCategoriesQuery, useAddNewCategoryMutation, useRemoveCategoryMutation, useUpdateCategoryMutation } = categoriesApi;

// TODO: Implement fetch to the server
export const getAllCategories = async (): Promise<
  BackendResponse<Category[]>
> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category`);

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
};