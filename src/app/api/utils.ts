import { google } from 'googleapis';

export const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_GOOGLE_API_CLIENT_ID,
    process.env.NEXT_GOOGLE_API_CLIENT_SECRET,
    process.env.NODE_ENV === 'production'
      ? 'https://happy-tails-mantine.vercel.app/admin/seo'
      : 'http://localhost:3000/admin/seo'
);
  
google.options({ auth: oauth2Client });