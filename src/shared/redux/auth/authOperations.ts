import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KEYCLOAK_AUTH_URL!,
});

const setToken = (token: string) => {
  instance.defaults.headers.authorization = `Bearer ${token}`;
};

const clearToken = () => {
  instance.defaults.headers.authorization = '';
};

export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get('/userinfo', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkApi) => {
    try {
      const { data } = await instance.post(
        `/token`,
        new URLSearchParams({
          grant_type: 'password',
          scope: 'openid email',
          client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
          username: credentials.email,
          password: credentials.password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      setToken(data.access_token);
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (data: { access_token: string; id_token: string }, thunkApi) => {
    try {
      setToken(data.access_token);
      await instance.get(`/logout`, {
        params: { id_token_hint: data.id_token },
      });
      clearToken();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
