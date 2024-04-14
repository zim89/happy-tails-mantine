"use client";
import { useRouter } from 'next/navigation';

import { clearAuthData } from '@/shared/redux/auth/authSlice';
import { useLogoutMutation } from '@/shared/api/authApi';
import { useAppDispatch } from '@/shared/redux/store';
import { APP_PAGES } from '@/shared/config/pages-url.config';

type Props = {
  children: (logout: () => void) => React.ReactNode;
}
export default function Logout({ children }: Props) {
const dispatch = useAppDispatch();
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      router.push(APP_PAGES.LOGIN);
      await logout();
      dispatch(clearAuthData());
    } catch (error) {
      console.log(error);
    }
  };

  return <>
        {children(handleLogout)}
    </>
}
