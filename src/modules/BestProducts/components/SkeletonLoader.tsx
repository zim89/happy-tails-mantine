import { Skeleton } from '@mantine/core';

export const SkeletonLoader = () => {
  return (
    <div className='flex flex-col gap-2'>
      <Skeleton width={520} height={80} />
      <Skeleton classNames={{ root: 'basis-[10%]' }} />
      <Skeleton classNames={{ root: 'basis-[15%]' }} />
      <Skeleton classNames={{ root: 'basis-[10%]' }} />
      <Skeleton classNames={{ root: 'basis-[15%]' }} />
      <Skeleton classNames={{ root: 'basis-[10%]' }} />
      <Skeleton classNames={{ root: 'basis-[15%]' }} />
    </div>
  );
};
