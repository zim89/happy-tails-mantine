'use client';

import { useState, useEffect } from 'react';
import { Banknote, Package } from 'lucide-react';

import { User } from '@/shared/types/auth.types';
import { getUserByEmail } from '@/shared/lib/requests';
import { formatDateFromArray } from '@/shared/lib/helpers';
import { isAxiosError } from 'axios';
import { NOT_FOUND } from '@/shared/constants/httpCodes';

type Guest = {
  kind: 'guest';
  email: string;
};

type SignedUser = {
  kind: 'user';
} & User;

type Props = {
  userEmail: string;
};
export const ClientDetails = ({ userEmail }: Props) => {
  const [user, setUser] = useState<SignedUser | Guest | null>(null);

  useEffect(() => {
    if (!userEmail) return;

    (async () => {
      try {
        const user = await getUserByEmail(userEmail);
        setUser({ ...user, kind: 'user' });
      } catch (err) {
        if (isAxiosError(err) && err.response?.data.status === NOT_FOUND) {
          setUser({ kind: 'guest', email: userEmail });
        }
        console.error('Request failed: ', err);
      }
    })();
  }, [userEmail]);

  if (!user) return null;

  if (user.kind === 'guest')
    return (
      <div className='rounded border border-brand-grey-300 bg-white'>
        <div className='flex items-center justify-between px-4'>
          <h2 className='py-[22px] text-xl font-bold'>Client details</h2>
          <p className='whitespace-nowrap text-xs text-brand-grey-800'>
            The user is just a guest
          </p>
        </div>
        <div className='flex border-y border-brand-grey-300'>
          <p className='flex items-center gap-2 border-r border-brand-grey-300 p-3 text-sm font-bold uppercase text-brand-grey-800'>
            <Banknote width={16} />
            <span>Email</span>
          </p>
          <p className='flex items-center  px-4 text-sm'>{userEmail}</p>
        </div>
      </div>
    );

  return (
    <div className='rounded border border-brand-grey-300 bg-white'>
      <div className='flex flex-col items-center justify-between px-4 py-[10px] md:flex-row md:py-[26px]'>
        <h2 className='text-xl font-bold'>Client details</h2>
        <p className='whitespace-nowrap text-xs text-brand-grey-800'>
          Customer since <br className='lg:hidden' />{' '}
          {formatDateFromArray(user.registerDate, 'MMM DD, YYYY')}
        </p>
      </div>
      <div className='grid grid-cols-[min-content_1fr] grid-rows-3 overflow-x-auto border-t border-brand-grey-300'>
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
