'use client';
import { profileMenu } from '@/modules/ProfileMenu/lib/data';
import { useAuth } from '@/shared/hooks/useAuth';
import Link from 'next/link';

export default function SidebarMenu() {
  const { currentUser } = useAuth();

  return (
    <ul className='hidden w-[274px] p-0 lg:block mt-11 lg:mt-0'>
      {profileMenu[0] && (
        <li className='border-b-[1px] border-r-[1px]'>
          <Link href={profileMenu[0].href} className='block w-full pb-6 pt-4'>
            <span className='block pb-2 text-[28px] text-[#DB8420]'>
              {profileMenu[0].label}
            </span>
            <span className="font-light">
            {currentUser!.email}
            </span>
          </Link>
        </li>
      )}

      {profileMenu.slice(1).map((item, index) => {
        return (
          <li key={index} className='border-b-[1px] border-r-[1px] py-[21px]'>
            <Link href={item.href} className='block w-full'>
              <span className='py-2 text-sm text-[#161616] hover:text-[#DB8420]'>
                {item.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
