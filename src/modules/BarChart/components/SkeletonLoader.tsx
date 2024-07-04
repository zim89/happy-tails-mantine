import { Skeleton } from '@mantine/core';

export const SkeletonLoader = () => {
  return (
    <div className='rounded-2xl bg-primary p-3'>
      <div className='flex items-end gap-10 '>
        {[3, 5, 3, 4, 3, 3, 5, 4, 6, 3].map((item) => (
          <Skeleton key={item} width={60} height={50 * item} />
        ))}
      </div>
    </div>
  );
};
