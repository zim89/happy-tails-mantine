import PageHeader from '@/components/PageHeader';
import { Skeleton } from '@mantine/core';

export const EditProductSkeleton = () => {
  return (
    <>
      <PageHeader>
        {(Group) => (
          <>
            <Group
              title='Edit Product'
              additional='Product editing by manager. Fields marked with (*) are mandatory.'
            />
          </>
        )}
      </PageHeader>
      <div className='flex h-[70vh] w-full flex-col gap-4 lg:flex-row'>
        <div className='flex h-[70vh] w-full flex-col justify-end gap-4'>
          <Skeleton classNames={{ root: 'basis-[15%]' }} />
          <Skeleton classNames={{ root: 'basis-[15%]' }} />
          <Skeleton classNames={{ root: 'basis-[15%]' }} />
          <Skeleton classNames={{ root: 'basis-[15%]' }} />
          <Skeleton classNames={{ root: 'basis-[15%]' }} />
          <Skeleton classNames={{ root: 'basis-[15%]' }} />
        </div>
        <Skeleton classNames={{ root: 'basis-[60%]' }} />
      </div>
      <div className='my-10 flex h-16 w-full gap-4'>
        <Skeleton classNames={{ root: 'basis-[33%]' }} />
        <Skeleton classNames={{ root: 'basis-[33%]' }} />
        <Skeleton classNames={{ root: 'basis-[33%]' }} />
      </div>
    </>
  );
};
