import { Skeleton } from '@mantine/core';

export const SkeletonLoader = () => {
  return (
    <div className='flex gap-2'>
      <Skeleton width={235} height={160} />
      <Skeleton width={235} height={160} />
      <Skeleton width={235} height={160} />
      <Skeleton width={235} height={160} />
    </div>
  );
};
