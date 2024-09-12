import axios, { AxiosError } from 'axios';

import { KEYS } from '../constants/localStorageKeys';
import { API_URL, SITE_DOMAIN } from '../constants/env.const';

type Verification = {
  refresh_token: string;
  access_token: string;
  expires_in: number;
};

const axiosInstance = axios.create({
  baseURL: `${SITE_DOMAIN}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const candidate = localStorage.getItem(KEYS['google_verification']);
    let verification: Verification | null = candidate
      ? JSON.parse(candidate)
      : null;

    if (verification) {
      config.headers.Authorization = `Bearer ${verification.access_token}`;
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
    const candidate = localStorage.getItem(KEYS['google_verification']);
    let verification: Verification = JSON.parse(candidate!);

    if (
      error.response.data.message === 'Invalid Credentials' &&
      !originalRequest._retry
    ) {
      // Marking that we've already retried to avoid infinite loop
      originalRequest._retry = true;

      // Attempt to refresh the token
      const refresh = verification.refresh_token;
      const res = await refreshAccessToken(verification.access_token);

      const access_token = res.data.accessToken;
      const expires_in = res.data.expiryDate;

      // Update the header with the new token
      axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${access_token}`;

      localStorage.setItem(
        KEYS['google_verification'],
        JSON.stringify({
          access_token,
          refresh_token: verification.refresh_token,
          expires_in: expires_in,
        })
      );

      // Resend the original request with the new token
      return axiosInstance(originalRequest);
    }

    // If the refresh fails or other errors, just return the error
    return Promise.reject(error);
  }
);

export const retrieveToken = () => {
  const candidate = localStorage.getItem(KEYS['google_verification']);
  let verification: Verification | null = candidate
    ? JSON.parse(candidate)
    : null;

  return verification?.access_token;
};

export const getAccessToken = async (code: string) => {
  try {
    const params = new URLSearchParams({
      code,
    });

    const res = await axiosInstance.get('/token', { params });
    return res;
  } catch (err) {
    throw err;
  }
};

export const refreshAccessToken = async (refresh_token: string) => {
  try {
    const params = new URLSearchParams({
      refresh_token,
    });

    const res = await axiosInstance.get('/refresh', { params });

    return res;
  } catch (err) {
    throw err;
  }
};

export type AggregatedAnalyticsResponse = {
  message: {
    responseAggregationType: string;
    rows: Entry[];
  };
};

type Entry = {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type DimensionFilterGroup = {
  groupType: string;
  filter: {
    dimension: string;
    operator: string;
    expression: string;
  }[];
  aggregationType: string;
  rowLimit: string;
  startRow: string;
};

type AnalyticsQuery = {
  startDate: string;
  endDate: string;
  aggregationType?: string;
  dataState?: string;
  type?: string;
  startRow?: string;
  searchType?: string;
  rowLimit?: string;
  dimensions?: string[];
  dimensionFilterGroups?: Partial<DimensionFilterGroup>[];
};
export const getAnalytics = async (params: AnalyticsQuery) => {
  try {
    const res = await axiosInstance.post<AggregatedAnalyticsResponse>(
      'analytics',
      params
    );

    if (!res) throw new Error('No data returned.');

    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) throw err;
    else console.log(err);
  }
};
