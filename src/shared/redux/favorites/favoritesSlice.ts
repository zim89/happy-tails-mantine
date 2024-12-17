import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Favourite } from '@/shared/types/favourite.types';

export interface FavoritesState {
  items: Favourite[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Favourite>) => {
      state.items.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.items;

export const favoritesReducer = favoritesSlice.reducer;
