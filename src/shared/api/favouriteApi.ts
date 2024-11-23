import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/authApi';
import type { BackendResponse, Product, Sort } from '../types/types';
import { Favourite } from '../types/favourite.types';

export abstract class ResponseError {
  timestamp: number;
  status: number;
  error: string;
  message: string;
  path: string;
}

type PostFavourite = {
  productId: number;
  size: NonNullable<Product['productSizes']>[number]['size'];
};

export const favouriteApi = createApi({
  reducerPath: 'favouriteApi',
  tagTypes: ['Favourites'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    findMany: builder.query<
      BackendResponse<Favourite[]>,
      { page: number; limit: number; sort?: Sort }
    >({
      query: ({ page = 0, limit = 10, sort }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: limit.toString(),
        });

        if (sort && sort[0] !== 'none') params.append('sort', sort.join(','));

        return {
          url: '/favourite-product',
          method: 'get',
          params,
        };
      },
      providesTags: ['Favourites'],
    }),
    addFavourite: builder.mutation({
      query: ({ productId, size }: PostFavourite) => {
        return {
          url: `/favourite-product?productId=${productId}&size=${size}`,
          method: 'post',
        };
      },
      invalidatesTags: ['Favourites'],
    }),
    deleteFavourite: builder.mutation<void, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/favourite-product/${id}`,
          method: 'delete',
        };
      },
      invalidatesTags: ['Favourites'],
    }),
  }),
});

export const {
  useFindManyQuery,
  useAddFavouriteMutation,
  useDeleteFavouriteMutation,
} = favouriteApi;
