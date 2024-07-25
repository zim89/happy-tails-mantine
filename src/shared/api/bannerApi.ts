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
      invalidatesTags: ['Banner'],
    }),
    deleteBanner: builder.mutation<Banner, DeleteBanner>({
      query: ({ id }) => ({
        url: `/banner-image/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Banner'],
    }),
    updateBanner: builder.mutation<Banner, UpdateBanner>({
      query: (data) => ({
        url: '/banner-image',
        method: 'put',
        data,
      }),
      invalidatesTags: ['Banner'],
    }),
  }),
});

export const {
  useFindManyQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useUpdateBannerMutation,
} = bannerApi;
