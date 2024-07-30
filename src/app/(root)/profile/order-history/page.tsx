'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, UnstyledButton } from '@mantine/core';

import { cn } from '@/shared/lib/utils';
import { OrderTabs } from '../components/OrderTabs';
import classes from '../styles.module.css';
import { BackendResponse, Order } from '@/shared/types/types';
import axios from '@/shared/lib/interceptor';

function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios<BackendResponse<Order[]>>(
        'https://happytails-backend.lav.net.ua/happytails/api/orders?page=0&size=10'
      );

      setOrders(res.data.content);
    })();
  }, []);

  return (
    <>
      <h1
        className={cn(
          'heading mt-10 hidden px-6 lg:block',
          orders.length === 0 && 'text-center'
        )}
      >
        Order History
      </h1>
      {orders.length > 0 ? (
        <OrderTabs orders={orders} />
      ) : (
        <div className={classes.box}>
          <hgroup>
            <h1 className='text-2xl font-light md:whitespace-pre'>
              Your Order History is Currently Empty,{' '}
              <span className='text-brand-orange-800'>Start Shopping now</span>
            </h1>
            <p className={classes.boxParagraph}>
              Your Order History keeps track of all your purchases, making it
              easy to view, manage, and repurchase your favorite items. Once you
              start shopping with us, your orders will appear here, complete
              with all the details you need. Start exploring our wide range of
              products and find something that catches your eye!
            </p>
          </hgroup>
          <UnstyledButton className='btn mb-8 bg-secondary font-bold text-primary'>
            <Link href='/products'>Continue shopping</Link>
          </UnstyledButton>
        </div>
      )}
    </>
  );
}

export default OrderPage;
