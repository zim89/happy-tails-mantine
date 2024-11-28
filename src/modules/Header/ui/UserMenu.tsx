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
          className='flex items-center justify-center text-secondary'
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
            dropdown: 'px-0',
            item: 'hover:bg-brand-grey-200',
          }}
        >
          <Menu.Target>
            <button
              type='button'
              aria-label={"Open profile's menu"}
              className={cn('rounded-full p-1', opened && 'bg-brand-grey-300')}
            >
              <UserRound className='iconBtn' />
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            {isAdmin && (
              <Menu.Item>
                <Link
                  href={'/admin'}
                  className='text-secondary'
                  aria-label={'Admin Panel'}
                >
                  Admin panel
                </Link>
              </Menu.Item>
            )}

            {profileMenu.map((item) => (
              <Menu.Item key={item.id}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}

            <Menu.Item>
              <Logout>
                {(logOut) => (
                  <span is='button' onClick={logOut}>
                    Log out
                  </span>
                )}
              </Logout>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  );
}
