import axios from '@/shared/lib/interceptor';
import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  BackendResponse,
  CreateOrderBody,
  Order,
  Sort,
} from '../types/types';
import { axiosBaseQuery } from '@/shared/api/authApi';
import { SITE_DOMAIN } from '../constants/env.const';

type OrderPayload = CreateOrderBody;

type DeleteOrderProps = {
  number: string;
};

type UpdateOrderProps = {
  orderNumber: Order['number'];
  paymentMethod: Order['paymentMethod'];
  commentOfManager: Order['commentOfManager'];
  shippingAddress: Partial<Order['shippingAddress']>;
  billingAddress: Partial<Order['billingAddress']>;
  shippingMethodId: string;
};

export type OrderParams = { page: number; limit: number; sort?: Sort };
export type OrderParamsWithStatus = {
  status: Order['orderStatus'];
} & OrderParams;

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  tagTypes: ['Orders'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    findManyByEmail: builder.query<BackendResponse<Order[]>, OrderParams>({
      query: ({ page, limit, sort }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: limit.toString(),
        });

        if (sort) params.append('sort', sort.join(','));

        return {
          url: `/orders?${params}`,
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
    findOneByEmailAndCode: builder.query<
      Order,
      { email: string; orderNumber: string }
    >({
      query: ({ email, orderNumber }) => ({
        url: `/orders/${email}/${orderNumber}`,
      }),
    }),
    findUserOrders: builder.query<BackendResponse<Order[]>, void>({
      query: () => ({
        url: '/orders',
      }),
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation<Order, OrderPayload>({
      query: (params) => ({
        url: '/orders',
        method: 'post',
        data: params,
        headers: {
          'Content-type': 'application/json',
        },
      }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          ordersApi.util.updateQueryData(
            'findMany',
            {
              page: 0,
              limit: 100000000,
            },
            (draft) => {
              draft.content.unshift({
                number: Date.now().toString(),
                paymentMethod: params.paymentMethod,
                email: params.email || '',
                emailMeWithOffersAndNews: params.emailMeWithOffersAndNews,
                commentOfManager: '',
                shippingAddress: {
                  addressLine1: params.shippingAddress.addressLine1 || '',
                  addressLine2: params.shippingAddress.addressLine2 || '',
                  city: params.shippingAddress.city || '',
                  country: params.shippingAddress.country || '',
                  company: params.shippingAddress.company || '',
                  firstName: params.shippingAddress.firstName || '',
                  lastName: params.shippingAddress.lastName || '',
                  phoneNumber: params.shippingAddress.phoneNumber || '',
                  state: params.shippingAddress.state || '',
                  zip: params.shippingAddress.zip || '',
                },
                billingAddress: {
                  addressLine1: params.billingAddress.addressLine1 || '',
                  addressLine2: params.billingAddress.addressLine2 || '',
                  city: params.billingAddress.city || '',
                  country: params.billingAddress.country || '',
                  company: params.billingAddress.company || '',
                  firstName: params.billingAddress.firstName || '',
                  lastName: params.billingAddress.lastName || '',
                  phoneNumber: params.billingAddress.phoneNumber || '',
                  state: params.billingAddress.state || '',
                  zip: params.billingAddress.zip || '',
                },
                id: '999',
                createdDate: Date.now(),
                userId: '1',
                discountAmount: 0,
                discountDTO: {
                  code: params.discountCode || '',
                  beginningDate: '',
                  discount: 0,
                  expirationDate: '',
                  id: 0x999,
                  minPrice: 0,
                },
                orderStatus: 'NEW',
                statusLastUpdatedAt: null,
                orderProductDTOList: [],
                shippingMethodDTO: {
                  daysOfDelivery: 0,
                  description: '',
                  id: params.shippingMethodId,
                  name: '',
                  price: 0,
                },
                eta: '',
                priceOfProducts: 0,
                taxAmount: 0,
                agreementToTerms: params.agreementToTerms,
                totalPrice: 0,
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
      async onQueryStarted({ number, status }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          ordersApi.util.updateQueryData(
            'findMany',
            {
              page: 0,
              limit: 100000000,
            },
            (draft) => {
              const order = draft.content.find((o) => o.number === number);
              if (order) {
                order.orderStatus = status;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
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
      async onQueryStarted({ number }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          ordersApi.util.updateQueryData(
            'findMany',
            {
              page: 0,
              limit: 100000000,
            },
            (draft) => {
              draft.content = draft.content.filter(
                (order) => order.number !== number
              );
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          ordersApi.util.updateQueryData(
            'findMany',
            {
              page: 0,
              limit: 100000000,
            },
            (draft) => {
              const order = draft.content.find(
                (o) => o.number === payload.orderNumber
              );
              if (order) {
                Object.assign(order, payload);
              }
            }
          )
        );

        const patchResultOne = dispatch(
          ordersApi.util.updateQueryData(
            'findOne',
            { orderNumber: payload.orderNumber },
            (draft) => {
              Object.assign(draft, payload);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          patchResultOne.undo();
        }
      },
      invalidatesTags: ['Orders'],
    }),
    findManyByStatus: builder.query<
      BackendResponse<Order[]>,
      OrderParamsWithStatus
    >({
      query: ({ status, limit, page, sort }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: limit.toString(),
        });

        if (sort) params.append('sort', sort.join(','));
        return {
          url: `/orders/status?orderStatus=${status}`,
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
  }),
});

export const {
  useFindManyQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useChangeStatusMutation,
  useUpdateOrderMutation,
  useFindOneQuery,
  useFindOneByEmailAndCodeQuery,
  useFindManyByEmailQuery,
  useFindUserOrdersQuery,
  useFindManyByStatusQuery,
} = ordersApi;

export const getDiscount = async (code: string) => {
  try {
    const res = await axios.get(SITE_DOMAIN + '/api/discount/' + code);
    return res.data;
  } catch (err) {
    throw err;
  }
};
