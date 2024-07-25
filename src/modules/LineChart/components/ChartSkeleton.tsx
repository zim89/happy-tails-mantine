import { Skeleton } from '@mantine/core';

export function ChartSkeleton() {
  return (
    <>
      <Skeleton height={30} radius='xl' width={100} />
      <div className='flex gap-4'>
        <Skeleton height={50} radius='xl' />
        <Skeleton height={50} radius='xl' />
        <Skeleton height={50} radius='xl' />
        <Skeleton height={50} radius='xl' />
      </div>
      <Skeleton height={252} radius='xl' />
    </>
  );
}
