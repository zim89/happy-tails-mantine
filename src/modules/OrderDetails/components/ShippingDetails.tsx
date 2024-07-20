import { Banknote, Package } from 'lucide-react';

import { Order } from '@/shared/types/types';
import { ShippingModal } from './ShippingModal';

type Props = {
  order: Order;
};

export const ShippingDetails = ({ order }: Props) => {
  return (
    <div className='col-span-2 rounded-[4px] border-[1px] border-brand-grey-300 bg-white'>
      <div className='flex items-center justify-between px-4 py-[22px]'>
        <h2 className='text-xl font-bold'>Shipping details</h2>
        <ShippingModal order={order} />
      </div>
      <div className='grid grid-cols-[min-content_1fr_1fr] grid-rows-3 border-t border-brand-grey-300'>
        <p className='flex w-52 items-center gap-2 border-r border-brand-grey-300 p-3 text-sm font-bold uppercase text-[#787878]'>
          <Banknote width={16} />
          <span>Billing address</span>
        </p>

        <p className='col-span-2 flex items-center text-ellipsis px-4 text-sm'>
          {Object.values(order.billingAddress)
            .filter((val) => !!val)
            .reduce((address, segment) => {
              if (!address.trim() && !segment) return segment;
              return segment + ', ' + address;
            }, '')}
        </p>

        <p className='flex w-52 items-center gap-2 border-y border-r border-brand-grey-300 p-3 text-sm font-bold uppercase text-[#787878]'>
          <Banknote width={16} />
          <span>Shipping address</span>
        </p>

        <p className='col-span-2 flex items-center text-ellipsis border-y border-[#EEE] px-4 text-sm'>
          {Object.values(order.shippingAddress)
            .filter((val) => !!val)
            .reduce((address, segment) => {
              if (!address.trim()) return segment;
              return segment + ', ' + address;
            }, '')}
        </p>

        <p className='flex w-52 items-center gap-2 border-r border-brand-grey-300 p-3 text-sm font-bold uppercase text-[#787878]'>
          <Package width={16} />
          <span>Shipment method</span>
        </p>

        <p className='col-span-2 flex items-center px-4 text-sm capitalize'>
          {order.shippingMethodDTO.name}
        </p>
      </div>
    </div>
  );
};
