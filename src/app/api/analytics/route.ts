import { google } from 'googleapis';
import { NextRequest } from 'next/server';
import { setToken } from '../utils';
import { GOOGLE_API_KEY } from '@/shared/constants/env.const';

const searchConsoleApi = google.searchconsole('v1');

const getAnalytics = async (token: string, payload: object) => {
  try {
    const res = await searchConsoleApi.searchanalytics.query({
      siteUrl: 'https://happy-tails-mantine.vercel.app/',
      key: GOOGLE_API_KEY,
      access_token: token,
      requestBody: {
        ...payload,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization');
    const body = await request.json();
    if (!token || !body)
      return Response.json(
        { message: 'Unauthorized' },
        { status: 401, statusText: 'Unauthorized' }
      );
    const [_, parsedToken] = token.split(' ');
    await setToken(parsedToken);
    const res = await getAnalytics(parsedToken.trim(), body);

    return Response.json({ message: res });
  } catch (err) {
    if (err instanceof Error)
      return Response.json({ message: err.message }, { status: 500 });
  }
}
