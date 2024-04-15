'use client';
import { Button } from '@mantine/core';
import { ChevronLeft, LogOut } from 'lucide-react';
import Link from 'next/link';

import classes from './AdminHeader.module.css';
import { User } from '@/shared/types/auth.types';
import { clearAuthData } from '@/shared/redux/auth/authSlice';
import { useAppDispatch } from '@/shared/redux/store';
import { useLogoutMutation } from '@/shared/api/authApi';
import { APP_PAGES } from '@/shared/config/pages-url.config';

type Props = {
  user: User;
};
export default function AdminHeader({ user }: Props) {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearAuthData());
      // Forced to redirect by explicitly reloading the page cause otherwise the logout triggers malfunction
      window.location.replace(APP_PAGES.LOGIN);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Link href='/' className={classes.returnLink}>
        <ChevronLeft />
        View your store
      </Link>
      <div className={classes.controls}>
        <div className={classes.avatar}>
          <span className={classes.avatarLogo}>{user.firstName[0]}</span>
          <span>{user.firstName}</span>
        </div>

        <Button
          onClick={handleLogout}
          leftSection={<LogOut size={14} />}
          variant='default'
        >
          Log Out
        </Button>
      </div>
    </header>
  );
}
