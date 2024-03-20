'use client';
import { Button, Tabs } from '@mantine/core';

import Toolbar from '@/modules/OrderToolbar';
import mock from '@/modules/OrderTable/mock.json';

import classes from './order.module.css';
import OrdersList from '@/modules/OrdersList';
import { PaginationStateful } from '@/modules/PaginationBar';

function OrderPage() {
  return (
    <>
    <h1 className="hidden lg:block text-4xl leading-[43.2px] mb-6">Order History</h1>    
    <Tabs
      defaultValue='orders'
      color='orange'
      classNames={{
        root: "mt-9 md:lg-10 lg:mt-0",
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
        <div className='mx-auto mt-14 flex flex-col md:items-center md:max-w-[572px]'>
          <hgroup className='text-center'>
            <h1 className='text-2xl leading-9 font-light'>The Application List is Empty!</h1>
            <p className='py-4 font-light'>
              No return or warranty requests have been made yet. Feel free to
              initiate one whenever needed. Your satisfaction is our priority!
            </p>
          </hgroup>
          <Button className="bg-black font-bold">Report a problem</Button>
        </div>
      </Tabs.Panel>
    </Tabs>
    </>
  );
}

export default OrderPage;