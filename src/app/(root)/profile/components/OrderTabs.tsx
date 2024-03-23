'use client';
import { Button, Tabs } from '@mantine/core';

import Toolbar from '@/modules/OrderToolbar';
import mock from '@/modules/OrderTable/mock.json';

import classes from '../styles.module.css';
import OrdersList from '@/modules/OrdersList';
import { PaginationStateful } from '@/modules/PaginationBar';
import { cn } from '@/shared/lib/utils';

export const OrderTabs = () => {
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

        <PaginationStateful initial={mock.content} maxPages={7}>
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
            <h1 className={cn(classes.boxHeading, "heading")}>
              The Application List is Empty!
            </h1>
            <p className={classes.boxParagraph}>
              No return or warranty requests have been made yet. Feel free to
              initiate one whenever needed. Your satisfaction is our priority!
            </p>
          </hgroup>
          <Button className={classes.reportButton}>Report a problem</Button>
        </div>
      </Tabs.Panel>
    </Tabs>
  );
};
