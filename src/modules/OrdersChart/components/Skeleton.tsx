import { Skeleton } from '@mantine/core';

export const SkeletonLoader = () => {
  return (
    <div className='flex gap-6'>
      <div className='basis-[33%]'>
        <div className='mb-2 flex gap-2'>
          <Skeleton height={36} />
          <Skeleton height={36} />
        </div>
        <Skeleton height={325} />
      </div>
      <div className='basis-[77%]'>
        <div className='mb-2 flex gap-2'>
          <Skeleton height={36} />
          <Skeleton height={36} />
        </div>
        <Skeleton height={325} />
      </div>
    </div>
  );
};
