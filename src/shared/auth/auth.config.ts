/*
import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { JWT } from '@auth/core/jwt';

const login = async (credentials: any) => {
  try {
    const response = await axios.post(
      process.env.KEYCLOAK_AUTH_URL!,
      new URLSearchParams({
        grant_type: 'password',
        scope: 'openid email',
        client_id: process.env.KEYCLOAK_CLIENT_ID!,
        username: credentials.email as string,
        password: credentials.password as string,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to login!');
  }
};

const getUserInfo = async (token: JWT) => {
  try {
    const { data } = await axios.get(process.env.KEYCLOAK_AUTH_USERINFO!, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return {
      id: data.sub,
      email: data.email,
      name: data.name,
      isAdmin: true,
      picture: data.image,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get user info!');
  }
};

export const authConfig = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const loginData = await login(credentials);
          const user = await getUserInfo(loginData.access_token);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
};
*/
