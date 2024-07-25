'use client';

import { notFound } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

import { useSelectUsers } from '@/shared/hooks/useSelectUsers';
import { formatDateFromArray } from '@/shared/lib/helpers';
import { Profile } from './components/Profile';
import { DeliveryDetails } from './components/DeliveryDetails';
import OrderHistoryTable from '../OrderHistoryTable';

type Props = {
  id: string;
};
export default function UserDetails({ id }: Props) {
  const [isRefetched, setIsRefetched] = useState(false);
  const user = useSelectUsers((state) =>
    state.find((user) => user.userId === id)
  );

  // TODO: 404 page should be handled properly

  useLayoutEffect(() => {
    !isRefetched && setIsRefetched(true);
    if (!user && isRefetched) return notFound();
  }, [user]);

  if (!user) return null;

  // Cut a timestamp
  const [day, year, _] = formatDateFromArray(user.registerDate).split(
    /(\w{4})/g
  );

  return (
    <>
      <hgroup>
        <h2 className='mb-1 max-w-[217px] overflow-hidden text-ellipsis whitespace-nowrap text-[2rem]/[2.4rem] font-black'>
          User #{user.userId}
        </h2>
        <p>Registered since {day + year}</p>
      </hgroup>

      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
        <Profile user={user} />
        <DeliveryDetails user={user} />
      </div>
      <OrderHistoryTable email={user.email} />
    </>
  );
}
