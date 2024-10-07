import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import type { ShippingMethod } from '@/shared/types/shippingMethod.types';
import type { Tax } from '@/shared/api/taxApi';
import type { Discount } from '@/shared/api/discountApi';
import { ShippingAddress } from '@/shared/types/types';

export interface CheckoutState {
  contactData: {
    email: string;
    subscription: boolean;
  } | null;
  shippingAddress: ShippingAddress | null;
  billingAddress: ShippingAddress | null;
  shippingMethod: ShippingMethod | null;
  paymentMethod: string;
  discount: Discount | null;
  tax: Tax | null;
}

const initialState: CheckoutState = {
  contactData: null,
  shippingAddress: null,
  billingAddress: null,
  shippingMethod: null,
  paymentMethod: 'cash',
  discount: null,
  tax: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setContactData: (state, action) => {
      state.contactData = action.payload;
    },
    setShippingData: (
      state,
      action: PayloadAction<CheckoutState['shippingAddress']>
    ) => {
      state.shippingAddress = action.payload;
    },
    setBillingData: (
      state,
      action: PayloadAction<CheckoutState['billingAddress']>
    ) => {
      state.billingAddress = action.payload;
    },
    setShippingMethod: (
      state,
      action: PayloadAction<CheckoutState['shippingMethod']>
    ) => {
      state.shippingMethod = action.payload;
    },
    setPaymentMethod: (
      state,
      action: PayloadAction<CheckoutState['paymentMethod']>
    ) => {
      state.paymentMethod = action.payload;
    },
    setTax: (state, action: PayloadAction<CheckoutState['tax']>) => {
      state.tax = action.payload;
    },
    setDiscount: (state, action: PayloadAction<CheckoutState['discount']>) => {
      state.discount = action.payload;
    },
  },
});

export const {
  setContactData,
  setShippingData,
  setBillingData,
  setShippingMethod,
  setPaymentMethod,
  setDiscount,
  setTax,
} = checkoutSlice.actions;

export const selectCheckout = (state: RootState) => state.checkout;

export const checkoutReducer = checkoutSlice.reducer;
