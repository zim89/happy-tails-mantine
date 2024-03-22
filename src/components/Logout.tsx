"use client";
import { useRouter } from 'next/navigation';

import { clearAuthData } from '@/shared/redux/auth/authSlice';
import { useLogoutMutation } from '@/shared/api/authApi';
import { useAppDispatch } from '@/shared/redux/store';
import { Button } from '@mantine/core';

export default function Logout() {
const dispatch = useAppDispatch();
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearAuthData());
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
