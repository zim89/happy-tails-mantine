import { User } from '@/shared/types/auth.types';
import { Banknote, Truck } from 'lucide-react';

type Props = {
  user: User;
};
export const DeliveryDetails = ({ user }: Props) => {
  return (
    <div className='grid grid-cols-[min-content_1fr] grid-rows-[56px_1fr_1fr] border-[1px] border-[#EEE] bg-white'>
      <h2 className='col-span-2 border-b-[1px] border-[#EEE] p-4 text-xl font-black'>
        Delivery address
      </h2>

      <>
        <p className='inline-flex items-center gap-2 whitespace-nowrap border-r-[1px] border-[#EEE] p-4 py-7 font-black uppercase text-[#787878]'>
          <Banknote size={16} /> Billing address
        </p>
        <p className='p-4 py-7'>
          {Object.values(user.billingAddress).reduceRight(
            (address, segment) => {
              if (!address.trim()) return segment;
              return segment + ', ' + address;
            },
            ''
          )}
        </p>
      </>

      <>
        <p className='inline-flex items-center gap-2 whitespace-nowrap border-l-0 border-r-[1px] border-t-[1px] border-[#EEE] p-4 py-7 font-black uppercase text-[#787878]'>
          <Truck size={16} /> Shipping Address
        </p>
        <p className='border-t-[1px] border-[#EEE] p-4 py-7'>
          {Object.values(user.shippingAddress).reduceRight(
            (address, segment) => {
              if (!address.trim()) return segment;
              return segment + ', ' + address;
            },
            ''
          )}
        </p>
      </>
    </div>
  );
};
