import { Skeleton } from '@mantine/core';

export const SkeletonLoader = () => {
  return (
    <div className='flex h-[404px] w-full flex-col gap-2'>
      <Skeleton height={80} />
      <Skeleton classNames={{ root: 'basis-[10%]' }} />
      <Skeleton classNames={{ root: 'basis-[15%]' }} />
      <Skeleton classNames={{ root: 'basis-[10%]' }} />
      <Skeleton classNames={{ root: 'basis-[15%]' }} />
      <Skeleton classNames={{ root: 'basis-[10%]' }} />
      <Skeleton classNames={{ root: 'basis-[15%]' }} />
    </div>
  );
};
