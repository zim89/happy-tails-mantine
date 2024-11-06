import PageHeader from '@/components/PageHeader';
import { Skeleton } from '@mantine/core';

export const ProductsDisplaySkeleton = () => {
  return (
    <>
      <PageHeader>
        {(Group) => (
          <>
            <Group title='Products' additional='Manage your product catalog' />
          </>
        )}
      </PageHeader>
      <div className='flex items-center justify-between border border-b-0 bg-primary px-4 py-6'>
        <h2 className='mr-6 text-base/[24px] font-bold'>Products Catalog</h2>
      </div>

      <div className='flex flex-col gap-2'>
        {[1, 2, 3, 4, 5].map((num) => (
          <Skeleton animate key={num} height={84}></Skeleton>
        ))}
      </div>
    </>
  );
};
