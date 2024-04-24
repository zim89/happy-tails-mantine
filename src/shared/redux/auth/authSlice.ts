import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '@/shared/types/auth.types';

export interface AuthState {
  user: User | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthData: (state) => {
      state.isAuth = false;
      state.user = null;
    },
    setAuthData: (state, { payload }) => {
      state.user = payload;
      state.isAuth = true;
    },
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;

export const { setAuthData, clearAuthData } = authSlice.actions;
export const authReducer = authSlice.reducer;
