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
import { authReducer } from '@/shared/redux/auth/authSlice';
import { categoriesApi } from '@/shared/api/categoryApi';
import { authApi } from '@/shared/api/authApi';
import { ordersApi } from '@/shared/api/ordersApi';
import { userApi } from '@/shared/api/usersApi';
import { postApi } from '@/shared/api/postApi';
import { dashboardApi } from '@/shared/api/dashboardApi';
import { checkoutReducer } from './checkout/checkoutSlice';
import { shippingMethodsApi } from '../api/shippingMethodsApi';
import { discountApi } from '../api/discountApi';
import { taxApi } from '../api/taxApi';
import { cartApi } from '../api/cartApi';
import { bannerApi } from '../api/bannerApi';
import { feedbackApi } from '../api/feedbackApi';
import { favouriteApi } from '../api/favouriteApi';

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
  blacklist: [
    categoriesApi.reducerPath,
    ordersApi.reducerPath,
    productApi.reducerPath,
  ],
};
const cartPersistConfig = {
  key: 'cartHappyTails',
  storage,
};
const authPersistConfig = {
  key: 'authHappyTails',
  storage,
};

const favoritesPersistedReducer = persistReducer(
  favoritesPersistConfig,
  favoritesReducer
);
const cartPersistedReducer = persistReducer(cartPersistConfig, cartReducer);
const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [shippingMethodsApi.reducerPath]: shippingMethodsApi.reducer,
    [discountApi.reducerPath]: discountApi.reducer,
    [taxApi.reducerPath]: taxApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [favouriteApi.reducerPath]: favouriteApi.reducer,
    favorites: favoritesPersistedReducer,
    cart: cartPersistedReducer,
    auth: authPersistedReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(productApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(ordersApi.middleware)
      .concat(userApi.middleware)
      .concat(postApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(discountApi.middleware)
      .concat(shippingMethodsApi.middleware)
      .concat(taxApi.middleware)
      .concat(cartApi.middleware)
      .concat(feedbackApi.middleware)
      .concat(bannerApi.middleware)
      .concat(favouriteApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
