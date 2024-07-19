import { createApi } from '@reduxjs/toolkit/query/react';

import { BackendResponse, Product, Sort, ID } from '../types/types';
import { FilterFormValues } from '@/modules/Toolbar/components/FilterForm/FilterForm';
import { axiosBaseQuery } from '@/shared/api/authApi';

type ProductPostRequest = {
  page: number;
  limit: number;
  categoryId?: number;
  filter?: FilterFormValues;
  sort?: Sort;
  name?: string;
};

export type ProductPutRequest = Omit<
  Product,
  | 'createdAt'
  | 'updatedAt'
  | 'unitsSold'
  | 'categoryName'
  | 'color'
  | 'relatedProducts'
>;

export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ['Products'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    findMany: builder.query<BackendResponse<Product[]>, ProductPostRequest>({
      query: ({ page, limit, categoryId, filter, sort, name }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: limit.toString(),
        });

        if (categoryId) params.append('categoryId', categoryId.toString());

        if (sort && sort[0] !== 'none') params.append('sort', sort.join(','));

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

          if (filter.size !== 'none') {
            params.append('sizeOfProduct', filter.size);
          }

          if (filter.color !== 'none') {
            params.append('color', filter.color);
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
    findBestSellers: builder.query<BackendResponse<Product[]>, void>({
      query: () => ({ url: '/products/best-sellers' }),
    }),
    create: builder.mutation<Product, { req: Partial<Product> }>({
      query({ req }) {
        return {
          url: '/products',
          method: 'post',
          data: req,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    update: builder.mutation<ProductPutRequest, { req: Product }>({
      query({ req }) {
        return {
          url: `/products`,
          method: 'put',
          data: req,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    remove: builder.mutation<void, { id: ID }>({
      query({ id }) {
        return {
          url: `/products/${id}`,
          method: 'delete',
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useFindManyQuery,
  useFindOneQuery,
  useFindBestSellersQuery,
  useCreateMutation,
  useUpdateMutation,
  useRemoveMutation,
} = productApi;

export const { findOne } = productApi.endpoints;
