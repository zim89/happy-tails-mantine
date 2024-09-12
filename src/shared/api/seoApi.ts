import axios, { AxiosError } from 'axios';

import { KEYS } from '../constants/localStorageKeys';
import { API_URL, GOOGLE_AUTH_URL, SITE_DOMAIN } from '../constants/env.const';

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

    console.log(config.params);

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
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401 && !error.config.sent) {
      error.config.sent = true;

      return axiosInstance.request(error.config);
    }

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
