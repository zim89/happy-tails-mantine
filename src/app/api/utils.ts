import {
  GOOGLE_API_ID,
  GOOGLE_API_SECRET,
  SITE_DOMAIN,
} from '@/shared/constants/env.const';
import { google } from 'googleapis';

export const oauth2Client = new google.auth.OAuth2(
  GOOGLE_API_ID,
  GOOGLE_API_SECRET,
  SITE_DOMAIN
);

google.options({ auth: oauth2Client });

export async function setToken(accessToken: string) {
  try {
    oauth2Client.setCredentials({ access_token: accessToken });
  } catch (err) {
    console.error(err);
  }
}

type OAuthError = Error & {
  status: number;
};

export const isOAthError = (err: unknown): err is OAuthError => {
  return err instanceof Error && 'status' in err;
};
