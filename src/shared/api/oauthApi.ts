import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const oauthApi = createApi({
  reducerPath: 'oautApi',
  tagTypes: ['OAuth'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getToken: builder.query({
      query: (code: string) => {
        const params = new URLSearchParams({
          code,
        });

        return {
          url: '/api/token',
          params,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
      providesTags: ['OAuth'],
    }),
    refreshToken: builder.query({
      query: (refresh_token: string) => {
        const params = new URLSearchParams({
          refresh_token,
        });

        return {
          url: '/api/refresh',
          params,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
  }),
});

export const { useGetTokenQuery, useRefreshTokenQuery } = oauthApi;
