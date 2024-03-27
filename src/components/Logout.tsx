"use client";
import { useRouter } from 'next/navigation';

import { clearAuthData } from '@/shared/redux/auth/authSlice';
import { useLogoutMutation } from '@/shared/api/authApi';
import { useAppDispatch } from '@/shared/redux/store';

type Props = {
  children: (logout: () => void) => React.ReactNode;
}
export default function Logout({ children }: Props) {
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

  return <>
        {children(handleLogout)}
    </>
}
