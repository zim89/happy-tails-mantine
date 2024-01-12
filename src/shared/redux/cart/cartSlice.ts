import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Product } from '@/shared/types/types';

interface CartItem extends Product {
  count: number;
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const calcTotalPrice = (items: CartItem[]): number => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((obj) => obj.id === action.payload.id);

      if (item) {
        item.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    decrementCartItem(state, action: PayloadAction<number>) {
      const item = state.items.find((obj) => obj.id === action.payload);

      if (item) {
        item.count--;
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    incrementCartItem(state, action: PayloadAction<number>) {
      const item = state.items.find((obj) => obj.id === action.payload);

      if (item) {
        item.count++;
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
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.items;

export const cartReducer = cartSlice.reducer;
