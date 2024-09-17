'use client';
import { useAppSelector } from '@/shared/redux/store';
import { selectIsAuth, selectUser } from '@/shared/redux/auth/authSlice';

export const useAuth = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const currentUser = useAppSelector(selectUser);

  const isAdmin = currentUser?.roles.includes('ROLE_ADMIN') ?? false;

  return {
    isAuth,
    currentUser,
    isAdmin,
  };
};
