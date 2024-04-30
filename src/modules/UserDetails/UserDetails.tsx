'use client';

import { useSelectUsers } from '@/shared/hooks/useSelectUsers';
import { formatArrayToDate } from '@/shared/lib/helpers';
import { Profile } from './components/Profile';
import { DeliveryDetails } from './components/DeliveryDetails';
import OrderHistoryTable from '../OrderHistoryTable';

type Props = {
  id: string;
};
export default function UserDetails({ id }: Props) {
  const user = useSelectUsers((state) =>
    state.find((user) => user.userId === id)
  );

  if (!user) return null;

  // Cut a timestamp
  const [day, year, _] = formatArrayToDate(user.registerDate).split(/(\w{4})/g);

  return (
    <>
      <hgroup>
        <h1 className='text-[32px] font-black whitespace-nowrap overflow-hidden text-ellipsis max-w-[217px]'>User #{user.userId}</h1>
        <p>Registered since {day + year}</p>
      </hgroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Profile user={user} />
        <DeliveryDetails user={user} />
      </div>
      <OrderHistoryTable email={user.email} />
    </>
  );
}
