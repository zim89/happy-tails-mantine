import axios from '@/shared/lib/interceptor';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { BackendResponse, Order, Product, Sort } from '../types/types';
import { axiosBaseQuery } from '@/shared/api/authApi';

type Address = {
  firstName: string;
  secondName: string;
  country: string;
  city: string;
  street: string;
  apartment: string;
};

type OrderPayload = {
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: string;
  items: string[];
  paymentMethod: string;
  email: string;
  count: number;
  discountCode?: string;
};

type DeleteOrderProps = {
  number: string;
};

type UpdateOrderProps = {
  orderNumber: string;
  shippingAddress: string;
  billingAddress: string;
  shippingMethod: string;
};

type CommentOrder = {
  orderNumber: string;
  comment: string;
};

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
            'Content-type': 'application/json',
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
    findOne: builder.query<Order, { orderNumber: string }>({
      query: ({ orderNumber }) => ({
        url: `/order/${orderNumber}`,
      }),
      providesTags: (result) =>
        result
          ? [
              {
                type: 'Orders' as const,
                id: result.number,
              },
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),
    createOrder: builder.mutation<Order, OrderPayload>({
      query: ({ count, items, ...params }) => ({
        url: '/orders',
        method: 'post',

        data: items.map((str) => {
          const orderItem: Product = JSON.parse(str);
          return {
            productId: orderItem.id,
            count,
            ...params,
          };
        }),
        headers: {
          'Content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Orders'],
    }),
    changeStatus: builder.mutation<
      Order,
      { number: string; status: Order['orderStatus'] }
    >({
      query: ({ number, status }) => {
        const params = new URLSearchParams({
          orderStatus: status,
        });

        return {
          url: `/order/${number}`,
          method: 'put',
          params,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
      invalidatesTags: ['Orders'],
    }),
    deleteOrder: builder.mutation<void, DeleteOrderProps>({
      query: ({ number }) => ({
        url: `/order/${number}`,
        method: 'delete',
        headers: {
          'Content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Orders'],
    }),
    updateOrder: builder.mutation<Order, UpdateOrderProps>({
      query: (payload) => ({
        url: `/order`,
        method: 'put',
        data: payload,
        headers: {
          'Content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Orders'],
    }),
    addComment: builder.mutation<void, CommentOrder>({
      query: ({ orderNumber, comment }) => {
        const params = new URLSearchParams({
          comment,
        });

        return {
          url: `/order/${orderNumber}/comment`,
          method: 'put',
          params,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useFindManyQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useChangeStatusMutation,
  useUpdateOrderMutation,
  useAddCommentMutation,
  useFindOneQuery,
} = ordersApi;

export const getDiscount = async (code: string) => {
  try {
    // TODO: replace this with env var
    const res = await axios.get(
      'https://happytails-backend.lav.net.ua/happytails/api/discount/' + code
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
