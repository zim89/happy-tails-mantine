import axios from "@/shared/lib/interceptor";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BackendResponse, Order, Product, Sort } from '../types/types';

type OrderPayload = {
  token: string;
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
  token: string;
  number: string;
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  tagTypes: ['Orders'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    findMany: builder.query<
      BackendResponse<Order[]>,
      { page: number; limit: number; token: string; sort?: Sort }
    >({
      query: ({ page, limit, token, sort }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: limit.toString(),
        });

        if (sort) params.append('sort', sort.join(','));

        return {
          url: `orders/all?${params}`,
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
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
      query: ({ token, count, items,  ...params }) => ({
        url: 'orders',
        method: 'post',
        params,
        body: items.map(str => {
          const orderItem: Product = JSON.parse(str);
          
          return {
            productId: orderItem.id,
            count: orderItem.quantity
          }
        }),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Orders"]
    }),
    deleteOrder: builder.mutation<void, DeleteOrderProps>({
      query: ({ number, token }) => ({
        url: `order/${number}`,
        method: "delete",
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    })
  }),
});

export const { useFindManyQuery, useCreateOrderMutation, useDeleteOrderMutation } = ordersApi;

export const getDiscount = async (code: string) => {
  try {
    // TODO: replace this with env var
    const res = await axios.get("https://happytails-backend.lav.net.ua/happytails/api/discount/" + code);
    return res.data;
  } catch (err) {
    throw err;
  }
}