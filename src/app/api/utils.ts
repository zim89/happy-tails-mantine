import { google } from 'googleapis';

export const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_GOOGLE_API_CLIENT_ID,
  process.env.NEXT_GOOGLE_API_CLIENT_SECRET,
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_SITE_DOMAIN + '/admin/'
    : 'http://localhost:3000/admin/'
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
