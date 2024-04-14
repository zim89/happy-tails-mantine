import axios, { AxiosError } from 'axios';
import { store } from '@/shared/redux/store';
import { clearAuthData, setAuthData } from '../redux/auth/authSlice';

const refreshToken = async (refreshToken: string) => {
  try {
    const params = new URLSearchParams();
    params.append('refreshToken', refreshToken);

    const res = await axios.post(
      'https://happytails-backend.lav.net.ua/happytails/api/users/refresh-token',
      params
    );

    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) throw err;
  }
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers or configurations you need
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState()?.auth?.session?.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      // Handling when the refresh token is expired
      const refresh_expires_in = store.getState().auth?.session?.refresh_expires_in!;

      if (Date.now() > refresh_expires_in) {
        window.location.replace("/auth/login");
        store.dispatch(clearAuthData());
        return;
      }

      // Marking that we've already retried to avoid infinite loop
      originalRequest._retry = true;

      // Attempt to refresh the token
      const refresh = store.getState().auth.session?.refresh_token!;

      console.log("Refreshing access token");

      const { access_token, refresh_token, refresh_expires_in: refreshExpiry } = await refreshToken(refresh);

      // Update auth data
      store.dispatch(
        setAuthData({ accessTokenResponse: { access_token, refresh_token, refresh_expires_in:  refreshExpiry }})
      );

      // Update the header with the new token
      axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${access_token}`;

      // Resend the original request with the new token
      return axiosInstance(originalRequest);
    }

    // If the refresh fails or other errors, just return the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
