'use client';
import { useAppSelector } from '@/shared/redux/store';
import {
  selectAccessToken,
  selectIsAuth,
  selectRefreshToken,
  selectUser,
} from '@/shared/redux/auth/authSlice';

export const useAuth = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const access_token = useAppSelector(selectAccessToken);
  const refresh_token = useAppSelector(selectRefreshToken);
  const currentUser = useAppSelector(selectUser);

  const isAdmin = currentUser?.roles.includes('ROLE_ADMIN') || false;
  // FIXME delete this
  const id_token = '';

  return {
    isAuth,
    access_token,
    refresh_token,
    currentUser,
    isAdmin,
    id_token,
  };
};
