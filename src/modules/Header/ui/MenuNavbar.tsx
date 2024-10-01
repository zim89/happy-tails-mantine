'use client';
import { useDeviceSize } from '@/shared/lib/hooks';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

import { additionalLinks } from '../lib/data';
import { useAuth } from '@/shared/hooks/useAuth';
import { Category } from '@/shared/types/types';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import Logout from '@/components/Logout';
import { useState } from 'react';
import { profileMenu } from '@/modules/ProfileMenu/lib/data';

type MenuNavbarProps = {
  menu: Category[];
  path: string;
};
function MenuNavbar({ menu, path }: MenuNavbarProps) {
  const { isDesktop } = useDeviceSize();
  const { isAuth, currentUser, isAdmin } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <div className='flex flex-col gap-8 lg:mx-auto lg:w-[1280px] lg:flex-row lg:items-center lg:justify-between lg:px-14'>
      {/*  Desktop Additional Menubar */}
      <ul className='hidden lg:flex lg:flex-col lg:gap-6'>
        <li>
          <Link
            href={'/contacts'}
            className={cn('navLink', path === '/contacts' && 'font-bold')}
          >
            Contacts
          </Link>
        </li>
        <li>
          <Link
            href={'/delivery&returns'}
            className={cn(
              'navLink',
              path === '/delivery&returns' && 'font-bold'
            )}
          >
            Delivery & Returns
          </Link>
        </li>
        <li>
          <Link
            href={'/blog'}
            className={cn('navLink', path === '/blog' && 'font-bold')}
          >
            Blog
          </Link>
        </li>
      </ul>

      <ul className='*:min-h-16 *:px-4 *:md:px-9 lg:flex lg:gap-3 *:lg:px-0'>
        <li
          className={cn(
            'border-b border-b-brand-grey-300 bg-brand-grey-300 lg:hidden',
            isAuth && 'bg-brand-orange-400'
          )}
        >
          {!isAuth ? (
            <Link href='/auth/login' className='group flex gap-2 py-4'>
              <Image
                src={'/icons/additional/user.svg'}
                alt='user icon'
                height={isDesktop ? 42 : 32}
                width={isDesktop ? 42 : 32}
              />
              <p className='navLink'>My Account</p>
            </Link>
          ) : (
            <button
              className={cn(
                'group flex w-full items-center gap-2 py-4',
                isUserMenuOpen && 'justify-between'
              )}
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
            >
              {isUserMenuOpen ? (
                <ChevronLeft />
              ) : (
                <Image
                  src='/icons/additional/user-filled.svg'
                  alt='user icon'
                  height={isDesktop ? 42 : 32}
                  width={isDesktop ? 42 : 32}
                />
              )}
              <p className='navLink'>{'Hello, ' + currentUser?.firstName}</p>
              {isUserMenuOpen ? (
                <div className='size-6'></div>
              ) : (
                <ChevronRight className='ml-auto' />
              )}
            </button>
          )}
        </li>
        {isUserMenuOpen && !isDesktop ? (
          <>
            {isAdmin && (
              <li className='border-b border-b-brand-grey-300 lg:border-none'>
                <Link
                  href='/admin'
                  onClick={close}
                  className={cn(
                    'group flex gap-2 py-4 lg:h-[100px] lg:w-[100px] lg:flex-col lg:items-center lg:py-3'
                  )}
                >
                  <p className='navLink'>Admin panel</p>
                </Link>
              </li>
            )}
            {profileMenu.map((item) => (
              <li
                key={item.id}
                className='border-b border-b-brand-grey-300 lg:border-none'
              >
                <Link
                  href={item.href}
                  onClick={close}
                  className={cn(
                    'group flex gap-2 py-4 lg:h-[100px] lg:w-[100px] lg:flex-col lg:items-center lg:py-3',
                    path === item.href && 'font-bold'
                  )}
                >
                  <p className='navLink'>{item.label}</p>
                </Link>
              </li>
            ))}
          </>
        ) : (
          <>
            <li className='border-b border-b-brand-grey-300 lg:border-none'>
              <Link
                href={'/products'}
                className={cn(
                  'group flex gap-2 py-4 lg:h-[100px] lg:w-[100px] lg:flex-col lg:items-center lg:py-3',
                  path === '/products' && 'font-bold'
                )}
              >
                <Image
                  src='https://i.imgur.com/4FsWarQ.png'
                  alt='all products page icon'
                  height={isDesktop ? 42 : 32}
                  width={isDesktop ? 42 : 32}
                />
                <p className='navLink'>All products</p>
              </Link>
            </li>
            {menu.map((item) => (
              <li
                key={item.id}
                className='border-b border-b-brand-grey-300 lg:border-none'
              >
                <Link
                  href={'/' + item.name.toLowerCase()}
                  onClick={close}
                  className={cn(
                    'group flex gap-2 py-4 lg:h-[100px] lg:w-[100px] lg:flex-col lg:items-center lg:py-3',
                    path === '/' + item.name && 'font-bold'
                  )}
                >
                  <Image
                    src={String(item.imgSrc)}
                    alt={item.name}
                    height={isDesktop ? 42 : 32}
                    width={isDesktop ? 42 : 32}
                  />
                  <p className='navLink'>{item.name}</p>
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>

      {/*  Tablet/Mobile Additional Menubar */}

      {isUserMenuOpen && (
        <Logout>
          {(logOut) => (
            <button
              onClick={logOut}
              className='flex w-fit gap-2 pl-4 md:pl-9 lg:hidden'
            >
              <LogOut className='text-brand-grey-600' />
              Log out
            </button>
          )}
        </Logout>
      )}

      <ul className='flex flex-col gap-4 pl-4 md:pl-9 lg:hidden'>
        {additionalLinks.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className='text-base font-light'>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuNavbar;
