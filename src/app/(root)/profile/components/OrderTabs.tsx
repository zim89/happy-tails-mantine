'use client';
import { Tabs } from '@mantine/core';

import Toolbar from '@/modules/OrderToolbar';
import { PaginationStateful } from '@/modules/PaginationBar';
import { cn } from '@/shared/lib/utils';
import OrdersList from '@/modules/OrdersList';

import classes from '../styles.module.css';
import ProblemReport from '@/modules/ProblemReport';
import { Order } from '@/shared/types/types';

type Props = {
  orders: Order[];
};
export const OrderTabs = ({ orders }: Props) => {
  return (
    <Tabs
      defaultValue='orders'
      color='orange'
      classNames={{
        root: classes.tabs,
        tab: classes.tab,
      }}
    >
      <Tabs.List>
        <Tabs.Tab value='orders'>All orders</Tabs.Tab>
        <Tabs.Tab value='warranty-returns'>Warranty and returns</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel
        value='orders'
        classNames={{
          panel: classes.ordersPanel,
        }}
      >
        <Toolbar />

        <PaginationStateful initial={orders} maxItems={7}>
          {(paginatedOrders, panel) => (
            <div className='mt-6'>
              <OrdersList orders={paginatedOrders} />
              <div className='mt-12'>{panel}</div>
            </div>
          )}
        </PaginationStateful>
      </Tabs.Panel>
      <Tabs.Panel value='warranty-returns'>
        <div className={classes.box}>
          <hgroup>
            <h1 className={cn(classes.boxHeading, 'heading')}>
              The Application List is Empty!
            </h1>
            <p className={classes.boxParagraph}>
              No return or warranty requests have been made yet. Feel free to
              initiate one whenever needed. Your satisfaction is our priority!
            </p>
          </hgroup>
          <ProblemReport />
        </div>
      </Tabs.Panel>
    </Tabs>
  );
};
