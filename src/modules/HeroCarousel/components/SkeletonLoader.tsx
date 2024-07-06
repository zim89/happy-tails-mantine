import { Skeleton } from '@mantine/core';

export const SkeletonLoader = () => {
  return (
    <Skeleton className='h-full max-h-[200px] w-full md:max-h-[360px] lg:min-h-[560px]' />
  );
};
