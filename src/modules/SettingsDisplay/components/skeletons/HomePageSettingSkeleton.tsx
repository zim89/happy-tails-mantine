import { Skeleton } from '@mantine/core';

export const HomePageSettingSkeleton = () => {
  return (
    <div className='mt-8 rounded-t border border-brand-grey-300 bg-white'>
      <h3 className='bg-brand-grey-300 p-4 text-xl font-bold'>Banners</h3>
      <div className='flex flex-col gap-3 px-4 pt-4 lg:flex-row lg:gap-6'>
        <div className='flex h-[250px] w-full flex-col gap-4'>
          <Skeleton classNames={{ root: 'basis-[20%]' }} />
          <Skeleton classNames={{ root: 'basis-[20%]' }} />
          <Skeleton classNames={{ root: 'basis-[20%]' }} />
          <Skeleton classNames={{ root: 'basis-[20%]' }} />
        </div>
        <div className='flex h-[250px]  w-full flex-col gap-4'>
          <Skeleton classNames={{ root: 'basis-[20%]' }} />
          <Skeleton classNames={{ root: 'basis-[20%]' }} />
          <Skeleton classNames={{ root: 'basis-[20%]' }} />
          <Skeleton classNames={{ root: 'basis-[20%]' }} />
        </div>
      </div>
    </div>
  );
};
