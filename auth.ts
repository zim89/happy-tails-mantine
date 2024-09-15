import { GOOGLE_API_ID, GOOGLE_API_SECRET } from '@/shared/constants/env.const';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        '320287221695-83tuus2agus0o9tgsmr19935tvad32lo.apps.googleusercontent.com',
      clientSecret: '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',
      redirectProxyUrl: 'http://localhost:3000/',
    }),
    Facebook({
      clientId: '860769716029602',
      clientSecret: '61945f0bc06952b9fc493c7f56c4440c',
    }),
  ],
});
