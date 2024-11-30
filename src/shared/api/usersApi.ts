import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/shared/api/authApi';
import { BackendResponse, Sort } from '../types/types';
import { User } from '../types/auth.types';

type UsersQueryParams = {
  size?: number;
  page?: number;
  sort?: Sort;
};

type DeleteUserParams = {
  userId: string;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    findMany: builder.query<BackendResponse<User[]>, UsersQueryParams>({
      query: ({ sort = ['asc'], page = 0, size = 1000000 }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: size.toString(),
        });

        if (sort) params.append('sort', sort.join(','));
        return {
          url: '/users',
          method: 'get',
          params,
        };
      },
      providesTags: ['User'],
    }),
    deleteUser: builder.mutation<void, DeleteUserParams>({
      query: ({ userId }) => {
        return {
          url: `/userds/${userId}`,
          method: 'delete',
        };
      },
      async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData('findMany', {}, (draft) => {
            draft.content = draft.content.filter(
              (user) => user.userId !== userId
            );
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: ['User'],
    }),
  }),
});

export const { useFindManyQuery, useDeleteUserMutation } = userApi;
