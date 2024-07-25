import { Skeleton } from '@mantine/core';

export const CircleChartSkeleton = () => {
  return (
    <div className='h-full w-full max-w-[427px]'>
      <Skeleton title='Header' height={56} mt={6} radius='md' />
      <Skeleton
        title='Chart'
        mt={12}
        classNames={{ root: 'h-[calc(100%-56px-6px-12px)]' }}
        radius='md'
      />
    </div>
  );
};
