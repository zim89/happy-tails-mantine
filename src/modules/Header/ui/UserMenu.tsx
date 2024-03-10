'use client';
import { useEffect, useState } from 'react';
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

  const handleLogout = () => {
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
          position='bottom-start'
          offset={15}
          shadow='md'
          width={173}
          classNames={{
            dropdown: "px-0",
            item: "hover:bg-[#F7F7F7]"
          }}
        >
          <Menu.Target>
            <button type='button'>
              <UserRound className='iconBtn' />
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>
              My Account
            </Menu.Item>
            <Menu.Item>
              Order history
            </Menu.Item>
            <Menu.Item>
              Update your details
            </Menu.Item>
            <Menu.Item>
              Update your password
            </Menu.Item>
            <Menu.Item>
              Delivery addresses
            </Menu.Item>
            <Menu.Item
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
