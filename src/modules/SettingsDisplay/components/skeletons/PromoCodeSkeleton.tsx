import { Skeleton } from '@mantine/core';
import { Clock3 } from 'lucide-react';

export const PromoCodeSkeleton = () => {
  return (
    <>
      <div className='mt-8'>
        <h2 className='rounded-t bg-brand-grey-300 p-4 text-xl/6 font-bold text-black'>
          Promo code
        </h2>
        <div className='flex border-x border-x-brand-grey-300 bg-white px-4 py-6'>
          <h3 className='inline-flex items-center gap-2 text-brand-grey-600'>
            <Clock3 size={24} />
            No active Promo Codes
          </h3>
        </div>
      </div>
      <div className='flex h-[300px] w-full flex-col gap-4'>
        <Skeleton classNames={{ root: 'basis-[20%]' }} radius={0} />
        <Skeleton classNames={{ root: 'basis-[20%]' }} />
        <Skeleton classNames={{ root: 'basis-[20%]' }} />
        <Skeleton classNames={{ root: 'basis-[20%]' }} />
      </div>
    </>
  );
};
