'use client';
import { useState } from 'react';
import { Menu } from '@mantine/core';
import { LogOut, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/shared/hooks/useAuth';
import { useAppDispatch } from '@/shared/redux/store';
import { logout } from '@/shared/redux/auth/authOperations';

export default function UserMenu() {
  const [opened, setOpened] = useState(false);
  const { isAuth, currentUser, access_token, id_token } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logout({ access_token, id_token }));
  };

  return (
    <>
      {!isAuth ? (
        <Link
          href={'/login'}
          className='flex items-center justify-center text-secondary'
        >
          <UserRound className='iconBtn' />
        </Link>
      ) : (
        <Menu
          opened={opened}
          onChange={setOpened}
          position='bottom-end'
          offset={15}
          shadow='md'
          width={173}
        >
          <Menu.Target>
            <button type='button'>
              <UserRound className='iconBtn' />
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{isAuth}</Menu.Label>
            <Menu.Item
              leftSection={<LogOut className='h-4 w-4' />}
              onClick={handleLogout}
            >
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  );
}
