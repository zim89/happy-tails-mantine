'use client';
import { Tabs } from '@mantine/core';

import Toolbar from '@/modules/OrderToolbar';
import mock from '@/modules/OrderTable/mock.json';

import classes from './order.module.css';
import OrdersList from '@/modules/OrdersList';
import { PaginationStateful } from '@/modules/PaginationBar';

function OrderPage() {
  return (
    <Tabs
      defaultValue='orders'
      color='orange'
      classNames={{
        root: 'py-6',
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
          panel: 'pt-6 flex flex-col min-h-[700px]',
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
        <>Returns</>
      </Tabs.Panel>
    </Tabs>
  );
}

export default OrderPage;