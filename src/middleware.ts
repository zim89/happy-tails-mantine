import NextAuth from 'next-auth';
import { authConfig } from '@/shared/auth/auth.config';
import {
  adminRoutes,
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  protectedRoutes,
} from '@/shared/auth/routes';

// export default NextAuth(authConfig).auth;

const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  // @ts-ignore
  const isAdmin = req.auth?.user?.isAdmin;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  // if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }
  //   return null;
  // }

  if (isAdminRoute) {
    if (!isLoggedIn || !isAdmin) {
      // return Response.redirect(new URL('/', nextUrl));
    }
  }

  if (!isLoggedIn && isProtectedRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
});

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};
