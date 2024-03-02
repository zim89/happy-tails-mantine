import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';

import { favoritesReducer } from './favorites/favoritesSlice';
import { cartReducer } from '@/shared/redux/cart/cartSlice';
import { productApi } from '@/shared/api/productApi';
import { ordersApi } from '../api/ordersApi';

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const favoritesPersistConfig = {
  key: 'favoritesHappyTails',
  storage,
  blacklist: [productApi.reducerPath],
};

const cartPersistConfig = {
  key: 'cartHappyTails',
  storage,
};

const favoritesPersistedReducer = persistReducer(
  favoritesPersistConfig,
  favoritesReducer
);

const cartPersistedReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    favorites: favoritesPersistedReducer,
    cart: cartPersistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(productApi.middleware)
      .concat(ordersApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
