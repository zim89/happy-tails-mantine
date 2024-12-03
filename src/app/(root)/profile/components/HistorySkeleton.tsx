import { cn } from '@/shared/lib/utils';
import { Skeleton } from '@mantine/core';

export const HistorySkeleton = () => {
  return (
    <>
      <h1 className={cn('heading mt-10 hidden px-6 text-center lg:block')}>
        Order History
      </h1>
      <div className='p-[21px]'>
        <Skeleton height={32} />
        <div className='mt-6 flex flex-col gap-2'>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} height={81} />
          ))}
        </div>
      </div>
    </>
  );
};
