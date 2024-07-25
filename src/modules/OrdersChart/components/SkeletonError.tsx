import { SkeletonLoader } from './Skeleton';

export const SkeletonError = () => {
  return (
    <div className='rounded-sm border-4 border-dashed border-yellow-300 bg-white p-3'>
      <p className='whitespace-pre pb-4 pt-1 text-center font-mono'>
        {
          "Whoops, it shouldn't have happened, our experts are already fixing this"
        }
      </p>
      <SkeletonLoader />
    </div>
  );
};
