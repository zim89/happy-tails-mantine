import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers or configurations you need
  },
  withCredentials: true
});

export default axiosInstance;
