'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { profileMenu } from '@/modules/ProfileMenu/lib/data';
import { useAuth } from '@/shared/hooks/useAuth';
import { cn } from '@/shared/lib/utils';

export default function SidebarMenu() {
  const { currentUser } = useAuth();
  const path = usePathname();

  return (
    <ul className='mt-11 hidden w-[274px] p-0 lg:mt-0 lg:block'>
      {profileMenu[0] && (
        <li className='border-b border-r-[1px]'>
          <Link href={profileMenu[0].href} className='block w-full pb-6 pt-4'>
            <span className='block pb-2 text-[28px] text-brand-orange-500'>
              {profileMenu[0].label}
            </span>
            <span className='font-light'>{currentUser?.email}</span>
          </Link>
        </li>
      )}

      {profileMenu.slice(1).map((item, index) => {
        return (
          <li
            key={index}
            className='flex items-center gap-3 border-b border-r py-[21px]'
          >
            <item.icon size={24} />
            <Link href={item.href} className='block w-full'>
              <span
                className={cn(
                  'py-2 text-sm text-secondary hover:text-brand-orange-500',
                  item.href === path && 'text-brand-orange-500'
                )}
              >
                {item.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
