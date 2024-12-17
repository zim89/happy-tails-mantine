import axios from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';

import axiosInstance from '@/shared/lib/interceptor';
import { axiosBaseQuery } from './authApi';
import { handleError } from '../helpers/error.helpers';

type TopCategoriesResponse = {
  categoryName: string;
  salesCount: number;
}[];

export type StatsMetrics =
  | 'orderCount'
  | 'orderCountInWeek'
  | 'averageOrder'
  | 'averageOrderInWeek'
  | 'profitStats'
  | 'profitStatsInWeek'
  | 'userCount'
  | 'userCountInWeek';

type StatsResponse = {
  [P in StatsMetrics]: number;
};

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  tagTypes: ['Dashboard'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    stats: builder.query<StatsResponse, void>({
      // TODO: type correction
      // @ts-ignore
      queryFn: async () => {
        let endpoints = [
          '/order-stats/count',
          '/order-stats/average-order-price',
          '/order-stats/profit-statistics',
          '/user-stats/count',
          '/order-stats/count-change-in-week',
          '/order-stats/average-order-price-change-in-week',
          '/order-stats/profit-statistics-change-in-week',
          '/user-stats/count-change-in-week',
        ];

        try {
          const res = await axios.all(
            endpoints.map((endpoint) => axiosInstance.get<number>(endpoint))
          );
          return {
            data: {
              orderCount: res[0].data,
              averageOrder: res[1].data,
              profitStats: res[2].data,
              userCount: res[3].data,
              orderCountInWeek: res[4].data,
              averageOrderInWeek: res[5].data,
              profitStatsInWeek: res[6].data,
              userCountInWeek: res[7].data,
            },
          };
        } catch (err) {
          handleError(err);
          return {
            error: 'Failed to fetch data',
          };
        }
      },
    }),
    topCategories: builder.query<TopCategoriesResponse, void>({
      query: () => ({
        url: '/category-stats/top-selling',
      }),
    }),
    fetchSales: builder.query<Array<any>, { year: string; month?: number }>({
      query: ({ year, month }) => {
        const form = new URLSearchParams();
        form.append('year', year);
        month && form.append('month', `${month}`);

        return {
          url: month
            ? '/order-stats/total-monthly-sales'
            : '/order-stats/total-sales',
          params: form,
        };
      },
    }),
  }),
});

export const { useStatsQuery, useTopCategoriesQuery, useFetchSalesQuery } =
  dashboardApi;
