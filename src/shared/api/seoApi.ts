import axios, { AxiosError } from 'axios';

import { SITE_DOMAIN } from '../constants/env.const';

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
    const res = await axios.post<AggregatedAnalyticsResponse>(
      `${SITE_DOMAIN}/api/analytics`,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res) throw new Error('No data returned.');

    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) throw err;
    else console.log(err);
  }
};
