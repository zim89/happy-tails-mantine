'use client';

import { useState, useEffect } from 'react';
import { Banknote, Package } from 'lucide-react';

import { User } from '@/shared/types/auth.types';
import { getUserByEmail } from '@/shared/lib/requests';
import { formatDateFromArray } from '@/shared/lib/helpers';

type Props = {
  userEmail: string;
};
export const ClientDetails = ({ userEmail }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!userEmail) return;

    (async () => {
      const user = await getUserByEmail(userEmail);
      setUser(user);
    })();
  }, [userEmail]);

  if (!user) return null;

  return (
    <div className='rounded border border-brand-grey-300 bg-white'>
      <div className='flex items-center justify-between px-4'>
        <h2 className='py-[22px] text-xl font-bold'>Client details</h2>
        <p className='whitespace-nowrap text-xs text-brand-grey-800'>
          Customer since <br className='lg:hidden' />{' '}
          {formatDateFromArray(user.registerDate, 'MMM DD, YYYY')}
        </p>
      </div>
      <div className='grid grid-cols-[min-content_1fr] grid-rows-3 border-y border-brand-grey-300'>
        <p className='flex items-center gap-2 border-r border-brand-grey-300 p-3 text-sm font-bold uppercase text-brand-grey-800'>
          <Banknote width={16} />
          <span>Name</span>
        </p>
        <p className='flex items-center text-ellipsis px-4 text-sm'>
          {user.firstName} {user.firstName}
        </p>
        <p className='flex items-center gap-2 border-y border-r border-brand-grey-300 p-3 text-sm font-bold uppercase text-brand-grey-800'>
          <Banknote width={16} />
          <span>Email</span>
        </p>
        <p className='flex items-center border-y border-brand-grey-300 px-4 text-sm'>
          {userEmail}
        </p>
        <p className='flex items-center gap-2 border-r border-brand-grey-300 p-3 text-sm font-bold uppercase text-brand-grey-800'>
          <Package width={16} />
          <span>Phone</span>
        </p>
        <p className='flex items-center px-4 text-sm'>{user.phoneNumber}</p>
      </div>
    </div>
  );
};
