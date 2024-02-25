import axios from 'axios';
import Credentials from 'next-auth/providers/credentials';
import type { AuthOptions, User } from 'next-auth';
import jwt from 'jsonwebtoken';

export const authConfig: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const response = await axios.post(
            process.env.KEYCLOAK_AUTH_URL!,
            new URLSearchParams({
              grant_type: 'password',
              client_id: process.env.KEYCLOAK_CLIENT_ID!,
              username: credentials.email,
              password: credentials.password,
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );

          const decodedPayload = jwt.decode(response.data.access_token);
          console.log(decodedPayload);

          if (decodedPayload) {
            const { sid, realm_access, name, email } = decodedPayload;
            return {
              id: sid,
              email,
              name,
              isAdmin: realm_access.roles.includes('ROLE_ADMIN'),
            };
          }
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log(user);
        // token.id = sid;
        // token.isAdmin = realm_access.roles.includes('ROLE_ADMIN');
      }
      return token;
    },
    async session({ session, token }) {
      // if (token) {
      //   session.user.id = token.id;
      //   session.user.isAdmin = token.isAdmin;
      // }
      return session;
    },
    async signIn({ user, account, profile }) {
      // console.log('user: ', user);
      // console.log('account:', account);
      // console.log('profile: ', profile);
      return true;
    },
  },
};
