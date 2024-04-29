import { User } from '@/shared/types/auth.types';
import { Banknote, Truck } from 'lucide-react';

type Props = {
  user: User;
};
export const DeliveryDetails = ({ user }: Props) => {
  return (
    <div className='grid grid-cols-[min-content_1fr] grid-rows-[56px_1fr_1fr] bg-white border-[1px] border-[#EEE]'>
      <h2 className='col-span-2 border-b-[1px] border-[#EEE] p-4 font-black'>
        Delivery address
      </h2>

      <>
        <p className='inline-flex whitespace-nowrap items-center gap-2 border-r-[1px] border-[#EEE] p-4 py-7 font-black uppercase text-[#787878]'>
          <Banknote size={16} /> Billing address
        </p>
        <p className='p-4 py-7'>{user.attributes?.billingAddress}</p>
      </>
      <>
        <p className='inline-flex whitespace-nowrap items-center gap-2 border-t-[1px] border-r-[1px] border-l-0 border-[#EEE] p-4 py-7 font-black uppercase text-[#787878]'>
          <Truck size={16} /> Shipping Address
        </p>
        <p className='border-t-[1px] border-[#EEE] p-4 py-7'>
          {user.attributes?.shippingAddress}
        </p>
      </>
    </div>
  );
};
