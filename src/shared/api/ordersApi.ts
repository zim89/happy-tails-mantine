import axios from "@/shared/lib/interceptor";
import { createApi } from '@reduxjs/toolkit/query/react';
import type { BackendResponse, Order, Product, Sort } from '../types/types';
import { axiosBaseQuery } from '@/shared/api/authApi';

type OrderPayload = {
  shippingAddress: string;
  billingAddress: string;
  shippingMethod: string;
  items: string[];
  paymentMethod: string;
  email: string;
  count: number;
  discountCode?: string;
}

type DeleteOrderProps = {
  number: string;
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  tagTypes: ['Orders'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    findMany: builder.query<
      BackendResponse<Order[]>,
      { page: number; limit: number; sort?: Sort }
    >({
      query: ({ page, limit, sort }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: limit.toString(),
        });

        if (sort) params.append('sort', sort.join(','));

        return {
          url: `/orders/all?${params}`,
          headers: {
            'Content-type': 'application/json'
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ number: id }) => ({
                type: 'Orders' as const,
                id,
              })),
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),
    createOrder: builder.mutation<Order, OrderPayload>({
      query: ({ count, items, ...params }) => ({
        url: '/orders',
        method: 'post',
        params,
        data: items.map(str => {
          const orderItem: Product = JSON.parse(str);
          
          return {
            productId: orderItem.id,
            count: orderItem.quantity
          }
        }),
        headers: {
          'Content-type': 'application/json',
        },
      }),
      invalidatesTags: ["Orders"]
    }),
    changeStatus: builder.mutation<Order, { number: string, status: Order["orderStatus"] }>({
      query: ({ number, status }) => {
        const params = new URLSearchParams({
          orderStatus: status
        });

        return {url: `/order/${number}/status`,
        method: "put",
        params,
        headers: {
          'Content-type': 'application/json',
        }
      }},
      invalidatesTags: ["Orders"]
    }),
    deleteOrder: builder.mutation<void, DeleteOrderProps>({
      query: ({ number }) => ({
        url: `/order/${number}`,
        method: "delete",
        headers: {
          'Content-type': 'application/json',
        },
      }),
      invalidatesTags: ["Orders"]
    })
  }),
});

export const { useFindManyQuery, useCreateOrderMutation, useDeleteOrderMutation, useChangeStatusMutation } = ordersApi;

export const getDiscount = async (code: string) => {
  try {
    // TODO: replace this with env var
    const res = await axios.get("https://happytails-backend.lav.net.ua/happytails/api/discount/" + code);
    return res.data;
  } catch (err) {
    throw err;
  }
}