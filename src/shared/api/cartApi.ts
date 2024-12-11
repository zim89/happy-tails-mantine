import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/authApi';
import type { Order, ShippingAddress } from '../types/types';
import { ResponseError } from '../types/error.types';

interface CreateOrderPayload {
  cartProducts: {
    productId: number;
    sizeEnum: string;
    count: number;
  }[];
  billingAddress: ShippingAddress;
  shippingAddress: ShippingAddress;
  shippingMethodId: number;
  paymentMethod: string;
  commentOfManager: string | null;
  email: string;
  agreementToTerms: boolean;
  emailMeWithOffersAndNews: boolean;
  discountCode?: string;
}

export const cartApi = createApi({
  reducerPath: 'cartApi',
  tagTypes: ['Cart'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    createOrderAuth: builder.mutation<
      Order | ResponseError,
      CreateOrderPayload
    >({
      query: (data) => ({
        url: '/orders',
        method: 'post',
        data,
      }),
    }),
  }),
});

export const { useCreateOrderAuthMutation } = cartApi;
