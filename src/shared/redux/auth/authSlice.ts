import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Session, User } from '@/shared/types/auth.types';

export interface AuthState {
  session: Session | null;
  user: User | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  session: null,
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
      state.session = null;
    },
    setAuthData: (state, { payload }) => {
      state.session = {
        ...payload.accessTokenResponse,
        refresh_expires_in: payload.accessTokenResponse.refresh_expires_in + Date.now()
      };
      state.user = payload.userDTO;
      state.isAuth = true;
    },
  },
});

export const selectSession = (state: RootState) => state.auth.session;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;

export const { setAuthData, clearAuthData } = authSlice.actions;
export const authReducer = authSlice.reducer;
