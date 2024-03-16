'use client';
import { useAppSelector } from '@/shared/redux/store';
import {
  selectAccessToken,
  selectIsAuth,
  selectRefreshToken,
} from '@/shared/redux/auth/authSlice';

export const useAuth = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const access_token = useAppSelector(selectAccessToken);
  const refresh_token = useAppSelector(selectRefreshToken);

  return { isAuth, access_token, refresh_token };
};
