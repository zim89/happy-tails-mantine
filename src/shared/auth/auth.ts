import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user && token) {
        token.id = user.id;
        //FIXME: types for User isAdmin
        // @ts-ignore
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token && session) {
        session.user.id = token.sub as string;
        //FIXME: types for User isAdmin
        // @ts-ignore
        session.user.isAdmin = token.isAdmin;
        session.user.name = token.name;
        session.user.email = token.email as string;
      }

      return session;
    },
  },
  ...authConfig,
});
