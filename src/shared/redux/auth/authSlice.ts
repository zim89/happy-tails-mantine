import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UserData {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  registerDate: string;
  roles: string[];
}

export interface AuthState {
  user: UserData | null;
  access_token: string;
  refresh_token: string;
  isAuth: boolean;
  refresh_token_expired_in: number;
}

const initialState: AuthState = {
  user: null,
  access_token: '',
  refresh_token: '',
  isAuth: false,
  refresh_token_expired_in: 0
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthData: (state) => {
      state.access_token = '';
      state.refresh_token = '';
      state.isAuth = false;
      state.refresh_token_expired_in = 0;
      state.user = null;
    },
    setAuthData: (state, { payload }) => {
      state.access_token = payload.accessTokenResponse.access_token;
      state.refresh_token = payload.accessTokenResponse.refresh_token;
      // Сonvert seconds into milliseconds
      state.refresh_token_expired_in = Date.now() + (Number(payload.accessTokenResponse.refresh_expires_in) * 1000);
      state.isAuth = true;
    },
    setUserData: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const selectAccessToken = (state: RootState) => state.auth.access_token;
export const selectRefreshToken = (state: RootState) =>
  state.auth.refresh_token;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectUser = (state: RootState) => state.auth.user;

export const { setAuthData, clearAuthData, setUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;
