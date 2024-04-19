import { Button } from '@mantine/core';
import { Edit2, Banknote, Package } from 'lucide-react';

import { Order } from '@/shared/types/types';
import { ShippingModal } from './ShippingModal';

type Props = {
  order: Order;
};

export const ShippingDetails = ({ order }: Props) => {
  return (
    <div className='col-span-2 rounded-[4px] border-[1px] border-[#EEE] bg-white'>
      <div className='flex items-center justify-between px-4 py-[22px]'>
        <h2 className='text-xl font-bold'>Shipping details</h2>
        <ShippingModal order={order}/>
      </div>

      <div className='flex border-t-[1px] border-[#EEE]'>
        <p className='flex w-52 items-center gap-2 border-r-[1px] border-[#EEE] p-3 text-sm font-bold uppercase text-[#787878]'>
          <Banknote width={16} />
          <span>Billing address</span>
        </p>
        <p className='flex items-center text-ellipsis px-4 text-sm'>
          {order.shippingAddress}
        </p>
      </div>
      <div className='flex border-y-[1px] border-[#EEE]'>
        <p className='flex w-52 items-center gap-2 border-r-[1px] border-[#EEE] p-3 text-sm font-bold uppercase text-[#787878]'>
          <Banknote width={16} />
          <span>Shipping address</span>
        </p>
        <p className='flex items-center text-ellipsis px-4 text-sm'>
          {order.shippingAddress}
        </p>
      </div>
      <div className='flex'>
        <p className='flex w-52 items-center gap-2 border-r-[1px] border-[#EEE] p-3 text-sm font-bold uppercase text-[#787878]'>
          <Package width={16} />
          <span>Shipment method</span>
        </p>
        <p className='flex items-center px-4 text-sm'>{order.shippingMethod}</p>
      </div>
    </div>
  );
};
