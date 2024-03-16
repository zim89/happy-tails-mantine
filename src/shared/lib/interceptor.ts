import axios from 'axios';
import { store } from '@/shared/redux/store';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
  headers: {
    // Add any other headers or configurations you need
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState()?.auth?.access_token;
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
