import { google } from 'googleapis';
import { NextRequest } from 'next/server';

const searchConsoleApi = google.searchconsole('v1');

const getAnalytics = async (token: string, payload: object) => {
  try {
    const res = await searchConsoleApi.searchanalytics.query({
      siteUrl: 'https://happy-tails-mantine.vercel.app/',
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
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
        { message: 'Hello' },
        { status: 401, statusText: 'Unauthorized' }
      );
    const [_, parsedToken] = token.split(' ');
    const res = await getAnalytics(parsedToken.trim(), body);

    return Response.json({ message: res });
  } catch (err) {
    if (err instanceof Error)
      return Response.json(
        { message: `Something went wrong. It's all what we know. DETAILS: ${err.message}` },
        { status: 500 }
      );
  }
}
