'use client';
import { useAppSelector } from '@/shared/redux/store';
import {
  selectIsAdmin,
  selectIsAuth,
  selectToken,
  selectUserData,
} from '@/shared/redux/auth/authSlice';

export const useAuth = () => {
  const isAdmin = useAppSelector(selectIsAdmin);
  const isAuth = useAppSelector(selectIsAuth);
  const currentUser = useAppSelector(selectUserData);
  const token = useAppSelector(selectToken);

  return { isAdmin, isAuth, currentUser, token };
};
