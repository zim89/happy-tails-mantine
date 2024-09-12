import axios from 'axios';
import { API_URL } from '../constants/env.const';

const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers or configurations you need
  },
  withCredentials: true,
});

export default axiosInstance;
