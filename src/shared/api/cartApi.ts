import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/authApi';
import type { Order } from '../types/types';
import type { Address } from '../redux/checkout/checkoutSlice';

interface CreateOrderPayload {
  cartProducts: {
    productId: number;
    sizeEnum: string;
    count: number;
  }[];
  billingAddress: Address;
  shippingAddress: Address;
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
    createOrderAuth: builder.mutation<Order, CreateOrderPayload>({
      query: (data) => ({
        url: '/orders',
        method: 'post',
        data,
      }),
    }),
  }),
});

export const { useCreateOrderAuthMutation } = cartApi;
