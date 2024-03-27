import { google } from 'googleapis';

export const oauth2Client = new google.auth.OAuth2(
    '79708318030-hm5pbn7md6ujitinb1p8aojf3f6g91ah.apps.googleusercontent.com',
    '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',
    process.env.NODE_ENV === 'production'
      ? 'https://happy-tails-mantine.vercel.app/admin/seo'
      : 'http://localhost:3000/admin/seo'
);
  
google.options({ auth: oauth2Client });