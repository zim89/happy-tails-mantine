'use client';
import { useState } from 'react';
import { Menu } from '@mantine/core';
import { LogOut, UserRound } from 'lucide-react';
import { logout } from '@/shared/api/authApi';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function UserMenu() {
  const [opened, setOpened] = useState(false);

  const { data: session } = useSession();
  const currentUser = session?.user || null;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!currentUser ? (
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
            <Menu.Label>{currentUser.email}</Menu.Label>
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
