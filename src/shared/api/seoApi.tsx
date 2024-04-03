import axios, { AxiosError } from 'axios';

type Verification = {
  refresh_token: string;
  access_token: string;
  expires_in: number;
};

export const getAccessToken = async (code: string) => {
  try {
    const params = new URLSearchParams({
      code,
    });

    const res = await axios.get(
      process.env.NODE_ENV === 'production'
        ? `https://happy-tails-mantine.vercel.app/api/token`
        : `http://localhost:3000/api/token`,
      { params }
    );

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

    const res = await axios.get(
      process.env.NODE_ENV === 'production'
        ? `https://happy-tails-mantine.vercel.app/api/refresh`
        : `http://localhost:3000/api/refresh`,
      { params }
    );

    return res;
  } catch (err) {
    throw err;
  }
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
  verification: Verification;
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
export const getAnalytics = async ({
  verification,
  ...rest
}: AnalyticsQuery) => {
  try {
    let access_token = verification.access_token;
    
    
    // If the token is expired, exchange refresh token to access one
    if (verification.expires_in < Date.now()) {
      const refresh_token = verification.refresh_token;
      const res = await refreshAccessToken(refresh_token);

      localStorage.setItem(
        'google_verification',
        JSON.stringify({
          refresh_token,
          access_token: res.data.accessToken,
          expires_in: res.data.expiryDate,
        })
      );

      access_token = res.data.accessToken;
    }

    const res = await axios.post(
      process.env.NODE_ENV === 'production'
        ? `https://happy-tails-mantine.vercel.app/api/analytics`
        : `http://localhost:3000/api/analytics`,
      rest,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    return res;
  } catch (err) {
    if (err instanceof AxiosError) throw err;
    else console.log(err);
  }
};
