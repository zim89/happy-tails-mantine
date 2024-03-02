import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const instance = axios.create({
  baseURL:
    'https://test-happytails-security.lav.net.ua/realms/happytails/protocol/openid-connect',
});

const setBaseUrl = (url: string) => {
  instance.defaults.baseURL = url;
};

const setToken = (token: string) => {
  instance.defaults.headers.authorization = `Bearer ${token}`;
};

const clearToken = () => {
  instance.defaults.headers.authorization = '';
};

// TODO: KEYCLOAK_AUTH_URL from process.env
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

// TODO: KEYCLOAK_AUTH_URL and KEYCLOAK_CLIENT_ID from process.env
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkApi) => {
    setBaseUrl(
      'https://test-happytails-security.lav.net.ua/realms/happytails/protocol/openid-connect'
    );

    try {
      const { data } = await instance.post(
        `/token`,
        new URLSearchParams({
          grant_type: 'password',
          scope: 'openid email',
          client_id: 'happytails-ui',
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

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  setBaseUrl('https://happytails-backend.lav.net.ua/happytails/api');

  try {
    await instance.post('/user/logout');
    clearToken();
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});
