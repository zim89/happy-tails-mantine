import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Product } from '@/shared/types/types';

export interface CartItem extends Product {
  count: number;
  size?: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  totalPrice: 0,
};

const calcTotalPrice = (items: CartItem[]): number => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCartDrawer: (state) => {
      state.isOpen = true;
    },

    closeCartDrawer: (state) => {
      state.isOpen = false;
    },

    addToCart: (state, action) => {
      const item = state.items.find(
        (obj) =>
          obj.id === action.payload.id && obj.size === action.payload.size
      );

      if (item) {
        item.count += 1;
      } else {
        state.items.push({
          ...action.payload,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const idx = state.items.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (idx !== -1) {
        state.items.splice(idx, 1);
        state.totalPrice = calcTotalPrice(state.items);
      }
    },

    decrementCartItem(state, action: PayloadAction<CartItem>) {
      const item = state.items.find(
        (obj) =>
          obj.id === action.payload.id && obj.size === action.payload.size
      );

      if (item) {
        if (item.count > 1) item.count--;
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    incrementCartItem(state, action: PayloadAction<CartItem>) {
      const item = state.items.find(
        (obj) =>
          obj.id === action.payload.id && obj.size === action.payload.size
      );

      if (item) {
        if (item.count < item.totalQuantity) item.count++;
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decrementCartItem,
  incrementCartItem,
  clearCart,
  openCartDrawer,
  closeCartDrawer,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.items;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartIsOpen = (state: RootState) => state.cart.isOpen;

export const cartReducer = cartSlice.reducer;
