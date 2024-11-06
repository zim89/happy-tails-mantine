import BrandBox from '@/components/BrandBox';
import { Skeleton } from '@mantine/core';

export const DeliverySttingSkeleton = () => {
  return (
    <>
      <BrandBox title='Delivery option' className='mt-6'>
        <div className='px-4 pt-4'>
          <div className='flex h-[200px] w-full flex-col gap-4 lg:h-[50px] lg:flex-row lg:justify-between'>
            <Skeleton classNames={{ root: 'basis-[30%]' }} />
            <Skeleton classNames={{ root: 'basis-[30%]' }} />
            <Skeleton classNames={{ root: 'basis-[30%]' }} />
          </div>
        </div>
      </BrandBox>
    </>
  );
};
