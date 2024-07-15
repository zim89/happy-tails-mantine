import { AlertTriangle } from 'lucide-react';

import { CircleChartSkeleton } from './Skeleton';

export const SkeletonError = () => {
  return (
    <div className='relative w-[427px] rounded-sm border-4 border-dashed border-yellow-300 bg-white p-3'>
      <AlertTriangle
        className='absolute left-1/2 top-40 z-10 -translate-x-1/2 opacity-20'
        size={128}
      />
      <CircleChartSkeleton />
    </div>
  );
};
