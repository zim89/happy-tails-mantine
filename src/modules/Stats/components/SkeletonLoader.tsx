import { Skeleton } from '@mantine/core';

export const SkeletonLoader = () => {
  return (
    <div className='flex gap-2'>
      <Skeleton height={160} />
      <Skeleton height={160} />
      <Skeleton height={160} />
      <Skeleton height={160} />
    </div>
  );
};
