import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

export type OrderCounterProps = {
  className?: string;
  newOrders: number;
  inProgress: number;
  completed: number;
  canceled: number;
};

export default function OrderCounter({
  className,
  newOrders,
  inProgress,
  completed,
  canceled,
}: OrderCounterProps) {
  return (
    <ul className={cn('flex divide-x border border-brand-grey-300', className)}>
      <li className='flex basis-1/4 justify-between px-6 py-3'>
        <div>
          <p className='mb-1 text-[1.75rem]/[1.21428] font-bold'>{newOrders}</p>
          <h3 className='text-sm text-brand-grey-800'>New Orders</h3>
        </div>
        <Image
          src='/icons/additional/new-orders.svg'
          alt='Blue box with plus sign'
        />
      </li>
      <li className='flex basis-1/4 justify-between px-6 py-3'>
        <div>
          <p className='mb-1 text-[1.75rem]/[1.21428] font-bold'>
            {inProgress}
          </p>
          <h3 className='text-sm text-brand-grey-800'>In Progress</h3>
        </div>
        <Image
          src='/icons/additional/in-progress-orders.svg'
          alt='Yellow open box'
        />
      </li>
      <li className='flex basis-1/4 justify-between px-6 py-3'>
        <div>
          <p className='mb-1 text-[1.75rem]/[1.21428] font-bold'>{completed}</p>
          <h3 className='text-sm text-brand-grey-800'>Completed</h3>
        </div>
        <Image
          src='/icons/additional/completed-orders.svg'
          alt='Gray box with check mark'
        />
      </li>
      <li className='flex basis-1/4 justify-between px-6 py-3'>
        <div>
          <p className='mb-1 text-[1.75rem]/[1.21428] font-bold'>{canceled}</p>
          <h3 className='text-sm text-brand-grey-800'>Canceled</h3>
        </div>
        <Image
          src='/icons/additional/cancelled-orders.svg'
          alt='Red box with cross sign'
        />
      </li>
    </ul>
  );
}
