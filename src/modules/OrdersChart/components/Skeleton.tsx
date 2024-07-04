import { Skeleton } from '@mantine/core';

export const SkeletonLoader = () => {
  return (
    <div className='flex gap-6'>
      <div>
        <div className='mb-2 flex gap-2'>
          <Skeleton width={192} height={36} />
          <Skeleton width={114} height={36} />
        </div>
        <Skeleton width={314} height={325} />
      </div>
      <div>
        <div className='mb-2 flex gap-2'>
          <Skeleton width={432} height={36} />
          <Skeleton width={160} height={36} />
        </div>
        <Skeleton width={600} height={325} />
      </div>
    </div>
  );
};
