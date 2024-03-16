import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LoginResponse } from '@/shared/api/authApi';

export interface AuthState {
  access_token: string;
  refresh_token: string;
  isAuth: boolean;
}

const initialState: AuthState = {
  access_token: '',
  refresh_token: '',
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthData: (state) => {
      state.access_token = '';
      state.refresh_token = '';
      state.isAuth = false;
    },
    setAuthData: (state, { payload }) => {
      state.access_token = payload.access_token;
      state.refresh_token = payload.refresh_token;
      state.isAuth = true;
    },
  },
});

export const selectAccessToken = (state: RootState) => state.auth.access_token;
export const selectRefreshToken = (state: RootState) =>
  state.auth.refresh_token;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;

export const { setAuthData, clearAuthData } = authSlice.actions;
export const authReducer = authSlice.reducer;
