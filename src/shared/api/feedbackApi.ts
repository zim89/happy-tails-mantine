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
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          feedbackApi.util.updateQueryData(
            'findMany',
            {
              limit: 1000000,
              page: 0,
            },
            (draft) => {
              draft.content.unshift({
                id: Date.now(),
                content: `${draft.content}`,
                feedbackStatus: 'NEW',
                resolvedAt: null,
                sentAt: Date.now(),
                starred: false,
                replyOfManager: '',
                imageSrc: [],
                userEmail: '',
                userName: '',
                managerRepliedAt: null,
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
      async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          feedbackApi.util.updateQueryData(
            'findMany',
            {
              limit: 1000000,
              page: 0,
            },
            (draft) => {
              const feedback = draft.content.find((f) => f.id === id);
              if (feedback) {
                feedback.feedbackStatus = status;
              }
            }
          )
        );
        const patchResultOne = dispatch(
          feedbackApi.util.updateQueryData('findOne', id, (draft) => {
            draft.feedbackStatus = status;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          patchResultOne.undo();
        }
      },
      invalidatesTags: ['Feedbacks', 'Feedback'],
    }),
    toggleStarred: builder.mutation({
      query: (id: number) => ({
        url: `/feedback/${id}/starred`,
        method: 'put',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          feedbackApi.util.updateQueryData(
            'findMany',
            {
              limit: 1000000,
              page: 0,
            },
            (draft) => {
              const feedback = draft.content.find((f) => f.id === id);
              if (feedback) {
                feedback.starred = !feedback.starred;
              }
            }
          )
        );
        const patchResultOne = dispatch(
          feedbackApi.util.updateQueryData('findOne', id, (draft) => {
            draft.starred = !draft.starred;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          patchResultOne.undo();
        }
      },
      invalidatesTags: ['Feedbacks', 'Feedback'],
    }),
    bulkEdit: builder.mutation({
      query: (data: Feedback[]) => ({
        url: `/feedbacks/bulk-edit`,
        method: 'patch',
        data: { reviews: data },
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          feedbackApi.util.updateQueryData(
            'findMany',
            {
              limit: 1000000,
              page: 0,
            },
            (draft) => {
              data.forEach((update) => {
                const feedback = draft.content.find((f) => f.id === update.id);
                if (feedback) {
                  Object.assign(feedback, update);
                }
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Feedbacks'],
    }),
    remove: builder.mutation<void, { id: ID }>({
      query({ id }) {
        return {
          url: `/feedback/${id}`,
          method: 'delete',
        };
      },
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          feedbackApi.util.updateQueryData(
            'findMany',
            {
              limit: 1000000,
              page: 0,
            },
            (draft) => {
              draft.content = draft.content.filter(
                (feedback) => feedback.id !== id
              );
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
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
      async onQueryStarted(ids, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          feedbackApi.util.updateQueryData(
            'findMany',
            {
              limit: 1000000,
              page: 0,
            },
            (draft) => {
              draft.content = draft.content.filter(
                (feedback) => !ids.includes(feedback.id)
              );
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
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
      async onQueryStarted({ id, content }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          feedbackApi.util.updateQueryData('findOne', id, (draft) => {
            draft.replyOfManager = content;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
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
