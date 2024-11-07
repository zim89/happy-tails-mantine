import { Skeleton } from '@mantine/core';
import { Header } from './Header';

export const TableSkeleton = () => {
  return (
    <>
      <Header />
      <div className='flex items-center justify-between border border-b-0 bg-white p-4'>
        <h2 className='mr-6 text-xl/[1.5rem] font-bold'>Articles</h2>
      </div>
      <div className='flex h-[850px] w-full flex-col gap-2'>
        <Skeleton height={80} radius={0} />
        <Skeleton classNames={{ root: 'basis-[10%]' }} />
        <Skeleton classNames={{ root: 'basis-[15%]' }} />
        <Skeleton classNames={{ root: 'basis-[10%]' }} />
        <Skeleton classNames={{ root: 'basis-[15%]' }} />
        <Skeleton classNames={{ root: 'basis-[10%]' }} />
        <Skeleton classNames={{ root: 'basis-[15%]' }} />
        <Skeleton classNames={{ root: 'basis-[10%]' }} />
        <Skeleton classNames={{ root: 'basis-[15%]' }} />
      </div>
    </>
  );
};
