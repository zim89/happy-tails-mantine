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
      <div className='flex flex-col gap-2'>
        {[1, 2, 3, 4, 5].map((num) => (
          <Skeleton animate key={num} height={84}></Skeleton>
        ))}
      </div>
    </>
  );
};
