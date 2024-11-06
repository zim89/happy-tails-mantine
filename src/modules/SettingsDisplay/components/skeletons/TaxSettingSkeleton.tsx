import BrandBox from '@/components/BrandBox';
import { Skeleton } from '@mantine/core';

export const TaxSettingSkeleton = () => {
  return (
    <BrandBox className='max-w-[656px]' title={'The current tax'}>
      <div className='flex h-[50px]'>
        <Skeleton classNames={{ root: 'w-2/4' }} />
      </div>
    </BrandBox>
  );
};
