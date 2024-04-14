import { createApi } from '@reduxjs/toolkit/query/react';

import { BackendResponse, Product, Sort, ID } from '../types/types';
import { FilterFormValues } from '@/modules/Toolbar/components/FilterForm/FilterForm';
import { axiosBaseQuery } from '@/shared/api/authApi';

export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ['Products'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    findMany: builder.query<
      BackendResponse<Product[]>,
      {
        page: number;
        limit: number;
        categoryId?: number;
        filter?: FilterFormValues;
        sort?: Sort;
        name?: string;
      }
    >({
      query: ({ page, limit, categoryId, filter, sort, name }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: limit.toString(),
        });

        if (categoryId) params.append('categoryId', categoryId.toString());

        if (sort) params.append('sort', sort.join(','));

        if (name) params.append('name', name);

        if (filter) {
          if (!name) params.append('name', '');

          if (Number(filter.category) > 0)
            params.set('categoryId', filter.category);

          if (filter.price !== 'none') {
            const [min, max] = filter.price.split('-');

            if (min.length > 0) params.append('min', min);
            if (max.length > 0) params.append('max', max);
          }

          params.append('productStatus', filter.onlyInStock ? 'IN STOCK' : '');

          return {
            url: '/products/filter',
            method: 'get',
            params,
          };
        }

        if (categoryId) {
          return {
            url: '/product',
            method: 'get',
            params,
          };
        }

        if (name) {
          params.set('productStatus', '');
          return {
            url: '/products/filter',
            method: 'get',
            params,
          };
        }

        return {
          url: `/products`,
          method: 'get',
          params,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({
                type: 'Products' as const,
                id,
              })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    findOne: builder.query<Product, ID>({
      query: (id = 1) => ({
        url: `/products/${id}`,
        method: 'get',
      }),
    }),
    create: builder.mutation<
      Product,
      { req: Partial<Product>; access_token: string }
    >({
      query({ req, access_token }) {
        return {
          url: '/products',
          method: 'post',
          data: req,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    update: builder.mutation<Product, { req: Product; access_token: string }>({
      query({ req, access_token }) {
        return {
          url: `/products`,
          method: 'put',
          data: req,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    remove: builder.mutation<void, { id: ID; access_token: string }>({
      query({ id, access_token }) {
        return {
          url: `/products/${id}`,
          method: 'delete',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useFindManyQuery,
  useFindOneQuery,
  useCreateMutation,
  useUpdateMutation,
  useRemoveMutation,
} = productApi;

export const { findOne } = productApi.endpoints;