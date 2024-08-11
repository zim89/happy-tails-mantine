import { Mail, Smartphone, User2 } from 'lucide-react';

import { User } from '@/shared/types/auth.types';

type Props = {
  user: User;
};
export const Profile = ({ user }: Props) => {
  return (
    <div className='grid grid-cols-[114px_1fr] grid-rows-[56px_1fr_1fr_1fr] border border-brand-grey-300 bg-white'>
      <h2 className='col-span-2 border-b-[1px] border-[#f9f2f2] p-4 text-xl font-black'>
        Personal information
      </h2>

      <>
        <p className='inline-flex items-center gap-2 border-r border-brand-grey-300 p-4 font-black uppercase text-brand-grey-900'>
          <User2 size={16} /> Name
        </p>
        <p className='p-4'>
          {user.firstName} {user.lastName}
        </p>
      </>
      <>
        <p className='inline-flex items-center gap-2 border border-l-0 border-brand-grey-300 p-4 font-black uppercase text-brand-grey-900'>
          <Mail size={16} /> Email
        </p>
        <p className='border-y border-brand-grey-300 p-4'>{user.email}</p>
      </>

      <>
        <p className='inline-flex items-center gap-2 border-r border-brand-grey-300 p-4 font-black uppercase text-brand-grey-900'>
          <Smartphone size={16} /> Phone
        </p>
        {user.shippingAddress?.phoneNumber ? (
          <p className='p-4'>{user.shippingAddress.phoneNumber}</p>
        ) : (
          <p className='p-4 font-semibold text-brand-grey-800'>
            User has not provided a phone number
          </p>
        )}
      </>
    </div>
  );
};
