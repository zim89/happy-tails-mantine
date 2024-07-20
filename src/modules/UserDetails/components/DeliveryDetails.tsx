import { User } from '@/shared/types/auth.types';
import { Banknote, Truck } from 'lucide-react';

type Props = {
  user: User;
};
export const DeliveryDetails = ({ user }: Props) => {
  return (
    <div className='grid grid-cols-[min-content_1fr] grid-rows-[56px_1fr_1fr] border border-brand-grey-300 bg-white'>
      <h2 className='col-span-2 border-b border-brand-grey-300 p-4 text-xl font-black'>
        Delivery address
      </h2>

      <>
        <p className='inline-flex items-center gap-2 whitespace-nowrap border-r border-brand-grey-300 p-4 py-7 font-black uppercase text-brand-grey-800'>
          <Banknote size={16} /> Billing address
        </p>
        <p className='p-4 py-7'>
          {Object.values(user.billingAddress)
            .filter((segment) => segment != null && segment !== 'string')
            .reduceRight((address, segment) => {
              if (!address.trim()) return segment;
              return segment + ', ' + address;
            }, '')}
        </p>
      </>

      <>
        <p className='inline-flex items-center gap-2 whitespace-nowrap border-l-0 border-r border-t border-brand-grey-300 p-4 py-7 font-black uppercase text-brand-grey-800'>
          <Truck size={16} /> Shipping Address
        </p>
        <p className='border-t border-brand-grey-300 p-4 py-7'>
          {Object.values(user.shippingAddress)
            .filter((segment) => segment != null && segment !== 'string')
            .reduceRight((address, segment) => {
              if (!address.trim()) return segment;
              return segment + ', ' + address;
            }, '')}
        </p>
      </>
    </div>
  );
};
