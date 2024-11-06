import OrderCounter from '@/components/OrderCounter';
import PageHeader from '@/components/PageHeader';

import classes from '../styles.module.css';
import { Skeleton } from '@mantine/core';

export const OrderTableSkeleton = () => {
  return (
    <>
      <OrderCounter
        className={classes.counter}
        newOrders={0}
        inProgress={0}
        completed={0}
        canceled={0}
      />
      <PageHeader>
        {(Group) => (
          <div className='mr-auto print:hidden'>
            <Group
              title='Order List'
              additional='View and check all orders registered on your store'
            />
          </div>
        )}
      </PageHeader>
      <div className={classes.orderCategories}>
        <h3 className='mr-3 flex-1 text-xl font-bold'>Orders</h3>
      </div>
      <div className='flex h-[404px] w-full flex-col gap-2'>
        <Skeleton height={80} radius={0} />
        <Skeleton classNames={{ root: 'basis-[10%]' }} />
        <Skeleton classNames={{ root: 'basis-[15%]' }} />
        <Skeleton classNames={{ root: 'basis-[10%]' }} />
        <Skeleton classNames={{ root: 'basis-[15%]' }} />
        <Skeleton classNames={{ root: 'basis-[10%]' }} />
        <Skeleton classNames={{ root: 'basis-[15%]' }} />
      </div>
    </>
  );
};
