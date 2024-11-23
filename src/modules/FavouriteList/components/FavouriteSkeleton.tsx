import { Skeleton } from '@mantine/core';

export const FavouriteSkeleton = () => {
  return (
    <div className='mt-12'>
      <Skeleton className='h-14 w-full' />
      <div className='container grid grid-cols-1 gap-4 py-6 md:grid-cols-2 md:py-8 lg:grid-cols-3 lg:gap-6'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((int) => (
          <Skeleton key={int} className='h-[473px] w-full' />
        ))}
      </div>
    </div>
  );
};
