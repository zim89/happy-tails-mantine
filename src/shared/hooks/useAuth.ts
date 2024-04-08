'use client';
import { useAppSelector } from '@/shared/redux/store';
import {
  selectIsAuth,
  selectSession,
  selectUser,
} from '@/shared/redux/auth/authSlice';

export const useAuth = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const currentUser = useAppSelector(selectUser);
  const session = useAppSelector(selectSession);

  const isAdmin = currentUser?.roles.includes('ROLE_ADMIN') ?? false;
  const accessToken = session?.access_token ?? '';
  const refreshToken = session?.refresh_token ?? '';

  return {
    isAuth,
    currentUser,
    isAdmin,
    accessToken,
    refreshToken,
  };
};
