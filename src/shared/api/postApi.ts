import { BackendResponse, Sort } from '@/shared/types/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './authApi';

export interface Post {
  id: number;
  title: string;
  slug: string;
  authorName: string;
  posterImgSrc: string;
  postStatus: string;
  content: string;
  createdAt: number;
  updatedAt: number | null;
  publishedAt: number;
  hero: boolean;
}

type PostRequest = {
  page?: number;
  size?: number;
  sort?: Sort;
};

export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Posts'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    findMany: builder.query<BackendResponse<Post[]>, PostRequest>({
      query: ({ page = 0, size = 1000000, sort }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: size.toString(),
        });

        if (sort) params.append('sort', sort.join(','));

        return {
          url: '/posts',
          params,
        };
      },
      providesTags: ['Posts'],
    }),
  }),
});

export const { useFindManyQuery } = postApi;
