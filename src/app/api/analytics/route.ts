import { google } from 'googleapis';
import { NextRequest } from 'next/server';
import {
  GOOGLE_API_KEY,
  GOOGLE_SA_PRIVATE_KEY,
  GOOGLE_SA_EMAIL,
} from '@/shared/constants/env.const';
import { SERVER_ERROR } from '@/shared/constants/httpCodes';

const searchConsoleApi = google.searchconsole('v1');

const googleJWTClient = new google.auth.JWT(
  GOOGLE_SA_EMAIL,
  undefined,
  GOOGLE_SA_PRIVATE_KEY,
  [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/webmasters',
  ]
);

const generateJWT = async () => {
  try {
    const res = await googleJWTClient.authorize();

    return res.access_token;
  } catch (err) {
    console.error(err);
  }
};

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
    const body = await request.json();
    if (!body)
      return Response.json(
        { message: 'Unauthorized' },
        { status: 400, statusText: 'The payload is required!' }
      );

    const token = await generateJWT();
    const res = await getAnalytics(`${token}`, body);

    return Response.json({ message: res });
  } catch (err) {
    if (err instanceof Error)
      return Response.json({ message: err.message }, { status: SERVER_ERROR });
  }
}
