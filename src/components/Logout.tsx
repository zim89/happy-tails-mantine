'use client';
import { clearAuthData } from '@/shared/redux/auth/authSlice';
import { useLogoutMutation } from '@/shared/api/authApi';
import { useAppDispatch } from '@/shared/redux/store';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { useCallback } from 'react';
import { KEYS } from '@/shared/constants/localStorageKeys';

type Props = {
  children: (logout: () => void) => React.ReactNode;
};
export default function Logout({ children }: Props) {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = useCallback(async () => {
    // Forced to redirect by explicitly reloading the page (window.location.replace)
    // cause otherwise the logout triggers malfunction
    // Explaination: when you clear auth data without state reset it redirects you to 403 page instead of login page
    try {
      await logout();
      dispatch(clearAuthData());
      window.location.replace(APP_PAGES.LOGIN);
      // Clear cart storage after logout
      localStorage.removeItem(KEYS.CART_STORAGE);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, logout]);

  return <>{children(handleLogout)}</>;
}
