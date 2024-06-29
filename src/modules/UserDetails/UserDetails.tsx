'use client';

import { useSelectUsers } from '@/shared/hooks/useSelectUsers';
import { formatDateFromArray } from '@/shared/lib/helpers';
import { Profile } from './components/Profile';
import { DeliveryDetails } from './components/DeliveryDetails';
import OrderHistoryTable from '../OrderHistoryTable';
import { notFound } from 'next/navigation';

type Props = {
  id: string;
};
export default function UserDetails({ id }: Props) {
  const user = useSelectUsers((state) =>
    state.find((user) => user.userId === id)
  );

  if (!user) return notFound();

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
