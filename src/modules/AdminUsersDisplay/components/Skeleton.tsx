import PageHeader from '@/components/PageHeader';
import { Skeleton } from '@mantine/core';

export const AdminUsersSkeleton = () => {
  return (
    <>
      <div className='mt-10 flex items-center justify-between border border-b-0 bg-white p-4'>
        <h2 className='mr-6 text-xl/[24px] font-bold'>Users</h2>
      </div>
      <div className='flex h-[404px] w-full flex-col gap-2'>
        <Skeleton height={80} radius={0} />
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
