import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './authApi';
import {
  CreateFeedbackPayload,
  type Feedback,
  type FeedbackStatus,
} from '@/shared/types/feedback.types';
import type { BackendResponse, ID, Sort } from '../types/types';

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  tagTypes: ['Feedbacks', 'Feedback'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    findMany: builder.query<
      BackendResponse<Feedback[]>,
      { page: number; limit: number; sort?: Sort }
    >({
      query: ({ page = 0, limit = 10, sort }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: limit.toString(),
        });

        if (sort && sort[0] !== 'none') params.append('sort', sort.join(','));

        return {
          url: '/feedback',
          method: 'get',
          params,
        };
      },
      providesTags: ['Feedbacks'],
    }),

    findOne: builder.query<Feedback, ID>({
      providesTags: ['Feedback'],
      query: (id) => ({
        url: `/feedback/${id}`,
        method: 'get',
      }),
    }),
    create: builder.mutation({
      query: (data: CreateFeedbackPayload) => ({
        url: '/feedback',
        method: 'post',
        data,
      }),
      invalidatesTags: ['Feedbacks'],
    }),
    updateStatus: builder.mutation({
      query: ({ id, status }: { id: number; status: FeedbackStatus }) => {
        const params = new URLSearchParams({
          status: status.toString(),
        });
        return {
          url: `/feedback/${id}/status`,
          method: 'put',
          params,
        };
      },
      invalidatesTags: ['Feedbacks', 'Feedback'],
    }),
    toggleStarred: builder.mutation({
      query: (id: number) => ({
        url: `/feedback/${id}/starred`,
        method: 'put',
      }),
      invalidatesTags: ['Feedback'],
    }),
    bulkEdit: builder.mutation({
      query: (data: Feedback[]) => ({
        url: `/feedbacks/bulk-edit`,
        method: 'patch',
        data: { reviews: data },
      }),
      invalidatesTags: ['Feedbacks'],
    }),
    remove: builder.mutation<void, { id: ID }>({
      query({ id }) {
        return {
          url: `/feedback/${id}`,
          method: 'delete',
        };
      },
      invalidatesTags: [{ type: 'Feedbacks', id: 'LIST' }],
    }),
    bulkRemove: builder.mutation<void, number[]>({
      query(ids) {
        const params = new URLSearchParams({
          ids: ids.toString(),
        });
        return {
          url: `/feedbacks/bulk-delete`,
          method: 'delete',
          params,
        };
      },
      invalidatesTags: ['Feedbacks'],
    }),
    reply: builder.mutation<void, { id: ID; content: string }>({
      query({ id, content }) {
        return {
          url: `/feedback/${id}/reply`,
          method: 'post',
          data: { content },
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
      invalidatesTags: ['Feedback'],
    }),
  }),
});

export const {
  useCreateMutation,
  useFindManyQuery,
  useFindOneQuery,
  useRemoveMutation,
  useReplyMutation,
  useUpdateStatusMutation,
  useToggleStarredMutation,
  useBulkRemoveMutation,
  useBulkEditMutation,
} = feedbackApi;
