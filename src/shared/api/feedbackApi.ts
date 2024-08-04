import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './authApi';
import { CreateFeedbackPayload } from '@/shared/types/feedback.types';

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  tagTypes: ['Feedback'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getAllFeedbacks: builder.query({
      query: () => ({
        url: '/feedback',
        method: 'get',
      }),
      providesTags: ['Feedback'],
    }),
    addFeedback: builder.mutation({
      query: (data: CreateFeedbackPayload) => ({
        url: '/feedback',
        method: 'post',
        data,
      }),
      invalidatesTags: ['Feedback'],
    }),
  }),
});

export const { useAddFeedbackMutation, useGetAllFeedbacksQuery } = feedbackApi;
