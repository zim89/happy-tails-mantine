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

type GetRequest = {
  page?: number;
  size?: number;
  sort?: Sort;
};

type PostRequest = {
  title: string;
  authorName: string;
  posterImgSrc: string;
  content: string;
  hero: boolean;
}

type PutRequest = PostRequest & {
  id: string;
}

export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Posts'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    findMany: builder.query<BackendResponse<Post[]>, GetRequest>({
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
    findOne: builder.query<Post, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/${id}`
      })
    }),
    updatePost: builder.mutation<Post, PutRequest>({
      query: ({ id, title, authorName, posterImgSrc, content, hero }) => ({
        url: `/posts`,
        method: "put",
        data: {
          id: id,
          title: title,
          authorName: authorName,
          posterImgSrc: posterImgSrc,
          content: content,
          hero
        },
        headers: {
          "Content-Type": "application/json"
        }
      }),
      invalidatesTags: ["Posts"]
    }),
    createPost: builder.mutation<Post, PostRequest>({
      query: ({ title, authorName, posterImgSrc, content, hero }) => ({
        url: `/posts`,
        method: "post",
        data: {
          title: title,
          authorName: authorName,
          posterImgSrc: posterImgSrc,
          content: content,
          hero,
          postStatus: "CREATED"
        },
        headers: {
          "Content-Type": "application/json"
        }
      }),
      invalidatesTags: ["Posts"]
    })
  }),
});

export const { useFindManyQuery, useFindOneQuery, useUpdatePostMutation, useCreatePostMutation } = postApi;