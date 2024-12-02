import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/authApi';
import { BackendResponse } from '../types/types';

export type Banner = {
  id: number;
  name: string;
  imagePath: string;
  productPath: string;
};

type CreateBanner = Omit<Banner, 'id'>;
type DeleteBanner = Pick<Banner, 'id'>;
type UpdateBanner = Banner;

export const bannerApi = createApi({
  reducerPath: 'bannerApi',
  tagTypes: ['Banner'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    findMany: builder.query<
      BackendResponse<Banner[]>,
      { page?: number; size?: number; sort?: string[] }
    >({
      query: ({ sort = ['asc'], page = 0, size = 10 }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: size.toString(),
        });

        if (sort) params.append('sort', sort.join(','));

        return {
          url: '/banner-image',
          params,
        };
      },
      providesTags: ['Banner'],
    }),
    createBanner: builder.mutation<Banner, CreateBanner>({
      query: (params) => ({
        url: '/banner-image',
        data: params,
        method: 'post',
      }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          bannerApi.util.updateQueryData('findMany', {}, (draft) => {
            draft.content.unshift({ id: Date.now(), ...params });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Banner'],
    }),
    deleteBanner: builder.mutation<Banner, DeleteBanner>({
      query: ({ id }) => ({
        url: `/banner-image/${id}`,
        method: 'delete',
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          bannerApi.util.updateQueryData('findMany', {}, (draft) => {
            draft.content = draft.content.filter((banner) => banner.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Banner'],
    }),
    updateBanner: builder.mutation<Banner, UpdateBanner>({
      query: (data) => ({
        url: '/banner-image',
        method: 'put',
        data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          bannerApi.util.updateQueryData('findMany', {}, (draft) => {
            const banner = draft.content.find((b) => b.id === data.id);
            if (banner) {
              Object.assign(banner, data);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Banner'],
    }),
  }),
});

export const {
  useFindManyQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useUpdateBannerMutation,
  useLazyFindManyQuery,
} = bannerApi;
