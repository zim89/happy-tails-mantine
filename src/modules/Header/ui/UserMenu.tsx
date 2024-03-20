'use client';
import { useState } from 'react';
import { Menu } from '@mantine/core';
import { UserRound } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/shared/hooks/useAuth';
import { useAppDispatch } from '@/shared/redux/store';
import { logout } from '@/shared/redux/auth/authOperations';

import { cn } from '@/shared/lib/utils';
import { profileMenu } from '@/modules/ProfileMenu/lib/data';

export default function UserMenu() {
  const [opened, setOpened] = useState(false);
  const { isAuth, access_token, id_token } = useAuth();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout({ access_token, id_token }));
  };

  return (
    <>
      {!isAuth ? (
        <Link
          href={'/login'}
          className='hidden items-center justify-center text-secondary lg:flex'
          aria-label={'Logout'}
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
            dropdown: 'px-0 hidden lg:block',
            item: 'hover:bg-[#F7F7F7]',
          }}
        >
          <Menu.Target>
            <button
              type='button'
              aria-label={"Open profile's menu"}
              className={cn(
                "hidden lg:block rounded-full p-1",
                opened && "bg-[#EEE]"
              )}
            >
              <UserRound className='iconBtn' />
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            {profileMenu.map(item => 
              <Menu.Item key={item.id}><Link href={item.href}>{item.label}</Link></Menu.Item>
            )}
            <Menu.Item onClick={handleLogout}>Log out</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  );
}
