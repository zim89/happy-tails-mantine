import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

import mockData from "@/modules/CategoriesTable/lib/category.json"
import { BackendResponse } from '../types/types';

export type Category = {
  id: number;
  name: string;
  title: string;
  path: string;
  description: string;
  productCount: number;
};

export type Credentials = {
  name: string;
  image: {
    path: string;
    name: string;
  };
};

export const postRequest = async ({ name, image }: Credentials) => {
  try {
    const res = await axios.post<BackendResponse<Category[]>>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category`,
      {
        name,
        imgSrc: image.path,
      }
    );

    return res;
  } catch (err) {
    if (err instanceof Error)
      throw new Error("Failed request, see what's happened: ", err);
  }
};

export const putRequest = async ({ name, image }: Credentials) => {
  try {
    const res = await axios.put<BackendResponse<Category[]>>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category`,
      {
        name,
        imgSrc: image.path,
      }
    );

    return res;
  } catch (err) {
    if (err instanceof Error)
      throw new Error("Failed request, see what's happened: ", err);
  }
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  tagTypes: ['Categories'],
  baseQuery: fetchBaseQuery(),
  endpoints: builder => ({
    fakeCategories: builder.query<Category[], void>({
      queryFn() {
        return { data: mockData["content"] }
      }
    })
  }),
});

export const { useFakeCategoriesQuery } = categoriesApi;