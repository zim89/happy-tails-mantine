import { User } from '@/shared/types/auth.types';
import { Mail, Smartphone, User2 } from 'lucide-react';

type Props = {
  user: User;
};
export const Profile = ({ user }: Props) => {
  return (
    <div className='grid grid-cols-[114px_1fr] grid-rows-[56px_1fr_1fr_1fr] bg-white border-[1px] border-[#EEE]'>
      <h2 className='col-span-2 border-b-[1px] text-xl border-[#f9f2f2] p-4 font-black'>
        Personal information
      </h2>

      <>
        <p className='inline-flex items-center gap-2 border-r-[1px] border-[#EEE] p-4 font-black uppercase text-[#787878]'>
          <User2 size={16} /> Name
        </p>
        <p className='p-4'>
          {user.firstName} {user.lastName}
        </p>
      </>
      <>
        <p className='inline-flex items-center gap-2 border-[1px] border-l-0 border-[#EEE] p-4 font-black uppercase text-[#787878]'>
          <Mail size={16} /> Email
        </p>
        <p className='border-y-[1px] border-[#EEE] p-4'>{user.email}</p>
      </>
      <>
        <p className='inline-flex items-center gap-2 border-r-[1px] border-[#EEE] p-4 font-black uppercase text-[#787878]'>
          <Smartphone size={16} /> Phone
        </p>
        <p className='p-4'>{user.attributes?.phone}</p>
      </>
    </div>
  );
};
