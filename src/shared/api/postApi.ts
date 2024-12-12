import { BackendResponse, Sort } from '@/shared/types/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './authApi';
import { handleError } from '../helpers/error.helpers';

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
};

type PutRequest = PostRequest & {
  id: string;
};

type DeleteRequest = {
  id: number;
};

type PostStatusRequest = {
  id: number;
  status: Post['postStatus'];
};

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
    getHero: builder.query<Post, void>({
      query: () => ({
        url: `/posts/hero`,
      }),
      providesTags: ['Posts'],
    }),
    findOne: builder.query<Post, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
      }),
      providesTags: (result) =>
        result
          ? [
              {
                type: 'Posts' as const,
                id: result.id,
              },
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    updatePost: builder.mutation<Post, PutRequest>({
      query: ({ id, title, authorName, posterImgSrc, content, hero }) => ({
        url: `/posts`,
        method: 'put',
        data: {
          id,
          title,
          authorName,
          posterImgSrc,
          content,
          hero,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData('findMany', {}, (draft) => {
            const post = draft.content.find(
              (post) => post.id === parseInt(id, 10)
            );
            if (post) {
              Object.assign(post, patch);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Posts'],
    }),
    createPost: builder.mutation<Post, PostRequest>({
      query: ({ title, authorName, posterImgSrc, content, hero }) => ({
        url: `/posts`,
        method: 'post',
        data: {
          title,
          authorName,
          posterImgSrc,
          content,
          hero,
          postStatus: 'PUBLISHED',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData('findMany', {}, (draft) => {
            draft.content.unshift({
              id: Date.now(),
              ...payload,
              slug: '',
              createdAt: Date.now(),
              publishedAt: Date.now(),
              updatedAt: null,
              postStatus: 'PUBLISHED',
            });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation<void, DeleteRequest>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'delete',
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData('findMany', {}, (draft) => {
            draft.content = draft.content.filter((post) => post.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          handleError(err);
          patchResult.undo();
        }
      },
      invalidatesTags: ['Posts'],
    }),
    changePostStatus: builder.mutation<Post, PostStatusRequest>({
      query: ({ id, status }) => {
        const params = new URLSearchParams({
          id: id.toString(),
          postStatus: status,
        });

        return {
          url: `/posts/update-status`,
          method: 'put',
          params,
        };
      },
      async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData('findMany', {}, (draft) => {
            const post = draft.content.find((post) => post.id === id);
            if (post) {
              post.postStatus = status;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useFindManyQuery,
  useFindOneQuery,
  useUpdatePostMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useChangePostStatusMutation,
  useGetHeroQuery,
} = postApi;
