import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './authApi';
import { QUERY_TAGS } from '../constants/query-tags.const';
import type {
  ShippingMethod,
  ShippingMethodsResponse,
} from '../types/shippingMethod.types';

export const shippingMethodsApi = createApi({
  reducerPath: 'shippingMethodsApi',
  tagTypes: [QUERY_TAGS.SHIPPING_METHODS],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getShippingMethods: builder.query<ShippingMethodsResponse, void>({
      query: () => ({
        url: '/shipping-methods',
        method: 'get',
        headers: {
          'Content-type': 'application/json',
        },
      }),
      providesTags: [QUERY_TAGS.SHIPPING_METHODS],
    }),
    updateShippingMethod: builder.mutation<ShippingMethod, ShippingMethod>({
      query: (shipment) => ({
        url: '/shipping-methods',
        method: 'put',
        data: shipment,
        headers: {
          'Content-type': 'application/json',
        },
      }),
      invalidatesTags: [QUERY_TAGS.SHIPPING_METHODS],
    }),
    deleteShippingMethod: builder.mutation<void, number>({
      query: (id) => ({
        url: `/shipping-methods/${id}`,
        method: 'delete',
        headers: {
          'Content-type': 'application/json',
        },
      }),
      invalidatesTags: [QUERY_TAGS.SHIPPING_METHODS],
    }),
    createShippingMethod: builder.mutation<
      ShippingMethod,
      Omit<ShippingMethod, 'id'>
    >({
      query: (shipment) => ({
        url: '/shipping-methods',
        method: 'post',
        data: shipment,
        headers: {
          'Content-type': 'application/json',
        },
      }),
      invalidatesTags: [QUERY_TAGS.SHIPPING_METHODS],
    }),
  }),
});

export const {
  useGetShippingMethodsQuery,
  useCreateShippingMethodMutation,
  useDeleteShippingMethodMutation,
  useUpdateShippingMethodMutation,
} = shippingMethodsApi;
