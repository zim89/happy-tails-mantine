'use client';
import { useAppSelector } from '@/shared/redux/store';
import {
  selectAccessToken,
  selectIdToken,
  selectIsAdmin,
  selectIsAuth,
  selectUserData,
} from '@/shared/redux/auth/authSlice';

export const useAuth = () => {
  const isAdmin = useAppSelector(selectIsAdmin);
  const isAuth = useAppSelector(selectIsAuth);
  const currentUser = useAppSelector(selectUserData);
  const access_token = useAppSelector(selectAccessToken);
  const id_token = useAppSelector(selectIdToken);

  return { isAdmin, isAuth, currentUser, access_token, id_token };
};
