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
}

const initialState: AuthState = {
  user: null,
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
      state.user = null;
    },
    setAuthData: (state, { payload }) => {
      state.access_token = payload.access_token;
      state.refresh_token = payload.refresh_token;
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
