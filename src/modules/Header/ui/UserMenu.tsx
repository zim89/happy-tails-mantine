'use client';
import { useState } from 'react';
import { Menu } from '@mantine/core';
import { UserRound } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/shared/hooks/useAuth';

import { cn } from '@/shared/lib/utils';
import { profileMenu } from '@/modules/ProfileMenu/lib/data';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import Logout from '@/components/Logout';

export default function UserMenu() {
  const [opened, setOpened] = useState(false);
  const { isAuth, isAdmin } = useAuth();
  
  return (
    <>
      {!isAuth ? (
        <Link
          href={APP_PAGES.LOGIN}
          className='hidden items-center justify-center text-secondary lg:flex'
          aria-label={'Logout'}
        >
          <UserRound className='iconBtn' />
        </Link>
      ) : isAdmin ? (
        <Link
          href={'/admin'}
          className='hidden items-center justify-center text-secondary lg:flex'
          aria-label={'Admin Panel'}
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
                'hidden rounded-full p-1 lg:block',
                opened && 'bg-[#EEE]'
              )}
            >
              <UserRound className='iconBtn' />
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            {profileMenu.map((item) => (
              <Menu.Item key={item.id}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}

            <Menu.Item>
              <Logout>
                {(logOut) => <span is='button' onClick={logOut}>Log out</span>}
              </Logout>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  );
}
