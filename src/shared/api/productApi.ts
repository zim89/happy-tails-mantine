import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackendResponse, Product, Sort, ID } from '../types/types';
import { FilterFormValues } from '@/modules/Toolbar/components/FilterForm/FilterForm';

export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
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

          return `products/filter?${params}`;
        }

        if (categoryId) {
          return `product?${params}`;
        }

        if (name) {
          params.set('productStatus', '');
          return `products/filter?${params}`;
        }

        return `products?${params}`;
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
      query: (id = 1) => `products/${id}`,
    }),
    create: builder.mutation({
      query(body) {
        return {
          url: 'products',
          method: 'POST',
          body,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    update: builder.mutation({
      query({ body }) {
        return {
          url: `products`,
          method: 'PUT',
          body,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    remove: builder.mutation({
      query(id) {
        return {
          url: `products/${id}`,
          method: 'DELETE',
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

// It's used on server components
export const getProductById = async (id: string) => {
  try {
    const request = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/products/' + id,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    
    const result: Product = await request.json();
    return result;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
};

export const getProducts = async () => {
  try {
    const request = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/products',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result: BackendResponse<Product[]> = await request.json();
    return result.content;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
};