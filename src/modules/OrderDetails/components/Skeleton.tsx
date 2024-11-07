import Breadcrumbs from '@/components/Breadcrumbs';
import { Skeleton } from '@mantine/core';
import { useSearchParams } from 'next/navigation';

export const OrderDetailsSkeleton = () => {
  const params = useSearchParams();
  const fromPage = params.get('fromPage');

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { href: '/admin/', text: 'Dashboard' },
          { href: `/admin/orders?page=${fromPage}`, text: 'Orders' },
          { text: 'Details' },
        ]}
        classNames={{
          root: 'p-0 m-0 mb-8',
        }}
      />
      <div className='mb-10 flex items-center justify-between'>
        <h1 className='mb-1 text-[2rem]/[2.4rem] font-bold'>
          Order #123-456-7890
        </h1>
      </div>
      <div className='flex h-[300px] w-full flex-col gap-4'>
        <Skeleton classNames={{ root: 'basis-[20%]' }} radius={0} />
        <Skeleton classNames={{ root: 'basis-[20%]' }} />
        <Skeleton classNames={{ root: 'basis-[20%]' }} />
        <Skeleton classNames={{ root: 'basis-[20%]' }} />
      </div>
      <section className='mt-8 grid h-screen grid-cols-3 gap-6'>
        <Skeleton classNames={{ root: 'col-span-3 lg:col-span-2' }} />
        <Skeleton classNames={{ root: 'col-span-2 lg:col-span-1' }} />
        <Skeleton classNames={{ root: 'col-span-1 lg:col-span-2' }} />
      </section>
    </>
  );
};
