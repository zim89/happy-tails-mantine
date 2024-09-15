import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import {
  FACEBOOK_API_ID,
  FACEBOOK_API_SECRET,
  GOOGLE_API_ID,
  GOOGLE_API_SECRET,
} from '@/shared/constants/env.const';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_API_ID,
      clientSecret: GOOGLE_API_SECRET,
    }),
    Facebook({
      clientId: FACEBOOK_API_ID,
      clientSecret: FACEBOOK_API_SECRET,
    }),
  ],
});
