import { Category } from '@/shared/api/categoryApi';
import { useDeviceSize } from '@/shared/lib/hooks';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

import { additionalLinks } from '../lib/data';
import { useAuth } from '@/shared/hooks/useAuth';

type MenuNavbarProps = {
  menu: Category[];
  path: string;
};
function MenuNavbar({ menu, path }: MenuNavbarProps) {
  const { isDesktop } = useDeviceSize();
  const { isAuth, isAdmin } = useAuth();

  return (
    <div className='flex flex-col gap-8 pl-4 md:pl-9 lg:mx-auto lg:w-[1280px] lg:flex-row lg:items-center lg:justify-between lg:px-14'>
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

      <ul className='lg:flex lg:gap-3'>
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
              href={'/' + item.path}
              onClick={close}
              className={cn(
                'group flex gap-2 py-4 lg:h-[100px] lg:w-[100px] lg:flex-col lg:items-center lg:py-3',
                path === '/' + item.path && 'font-bold'
              )}
            >
              <Image
                src={String(item.imgSrc)}
                alt={item.name}
                height={isDesktop ? 42 : 32}
                width={isDesktop ? 42 : 32}
              />
              <p className='navLink'>
                {item.name === 'Leads&harnesses' ? 'Leads' : item.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/*  Tablet/Mobile Additional Menubar */}

      <ul className='flex flex-col gap-4 lg:hidden'>
        <li>
          {!isAuth ? (
            <Link href='/auth/login' className='text-base font-light'>Log In</Link>
          ) : isAdmin ? (
            <Link href='/admin' className='text-base font-light'>Profile</Link>
          ) : (
            <Link href='/profile' className='text-base font-light'>Profile</Link>
          )}
        </li>
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