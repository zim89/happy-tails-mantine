import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getUserInfo, login, logout } from '@/shared/redux/auth/authOperations';

export interface Roles {
  roles: string[];
}

export interface User {
  sub: string;
  email_verified: boolean;
  realm_access: Roles;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  access_token: string;
  refresh_token: string;
  id_token: string;
  error: unknown;
  isAuth: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  access_token: '',
  refresh_token: '',
  id_token: '',
  error: null,
  isAuth: false,
  isAdmin: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) =>
    builder
      //  -------  login---------
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.id_token = action.payload.id_token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //  -------  getUserInfo---------
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        state.isAdmin = payload.realm_access.roles.includes('ROLE_ADMIN');
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //  -------  logout  ---------
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.access_token = '';
        state.refresh_token = '';
        state.id_token = '';
        state.error = null;
        state.isAuth = false;
        state.isAdmin = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const selectLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;
export const selectAccessToken = (state: RootState) => state.auth.access_token;
export const selectRefreshToken = (state: RootState) =>
  state.auth.refresh_token;
export const selectIdToken = (state: RootState) => state.auth.id_token;
export const selectUserData = (state: RootState) => state.auth.user;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;

export const {} = authSlice.actions;
export const authReducer = authSlice.reducer;
