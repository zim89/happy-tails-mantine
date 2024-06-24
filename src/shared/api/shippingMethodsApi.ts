import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './authApi';
import { QUERY_TAGS } from '../constants/query-tags.const';
import type { ShippingMethodsResponse } from '../types/shippingMethod.types';

export const shippingMethodsApi = createApi({
  reducerPath: 'shippingMethodsApi',
  tagTypes: [QUERY_TAGS.SHIPPING_METHODS],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getShippingMethods: builder.query<ShippingMethodsResponse, void>({
      query: () => ({
        url: '/shipping-methods',
        method: 'get',
      }),
    }),
  }),
});

export const { useGetShippingMethodsQuery } = shippingMethodsApi;
