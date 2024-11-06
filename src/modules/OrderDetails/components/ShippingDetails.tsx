import { Banknote, Package } from 'lucide-react';

import { Order } from '@/shared/types/types';
import { ShippingModal } from './ShippingModal';
import { cutOffArbitraryDeliveryFields, formatAddress } from '../lib';

type Props = {
  order: Order;
};

export const ShippingDetails = ({ order }: Props) => {
  const billingAddress = cutOffArbitraryDeliveryFields(order.billingAddress);
  const shippingAddress = cutOffArbitraryDeliveryFields(order.shippingAddress);

  return (
    <div className='col-span-3 max-h-max rounded-[4px] border border-brand-grey-300 bg-white lg:col-span-2'>
      <div className='flex items-center justify-between px-4 py-[22px]'>
        <h2 className='text-xl font-bold'>Shipping details</h2>
        <ShippingModal order={order} />
      </div>
      <div className='grid grid-cols-[min-content_1fr] border-t border-brand-grey-300'>
        <p className='flex w-52 items-center gap-2 border-r border-brand-grey-300 p-3 text-sm font-bold uppercase text-brand-grey-800'>
          <Banknote width={16} />
          <span>Billing address</span>
        </p>

        <p className='flex items-center text-ellipsis px-4 text-sm'>
          {formatAddress(billingAddress)}
        </p>

        <p className='flex w-52 items-center gap-2 border-y border-r border-brand-grey-300 p-3 text-sm font-bold uppercase text-brand-grey-800'>
          <Banknote width={16} />
          <span>Shipping address</span>
        </p>

        <p className='flex items-center text-ellipsis border-y border-brand-grey-300 px-4 text-sm'>
          {formatAddress(shippingAddress)}
        </p>

        <p className='flex w-52 items-center gap-2 border-r border-brand-grey-300 p-3 text-sm font-bold uppercase text-brand-grey-800'>
          <Package width={16} />
          <span>Shipment method</span>
        </p>

        <p className='flex items-center px-4 text-sm capitalize'>
          {order.shippingMethodDTO.name}
        </p>
      </div>
    </div>
  );
};
