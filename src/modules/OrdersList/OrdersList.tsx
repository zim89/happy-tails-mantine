'use client';

import { Fragment, useState } from 'react';

import { Order } from '@/shared/types/types';
import { OrderDetailsMobile } from './components/OrderDetailsMobile';
import { OrderDetails } from './components/OrderDetails';

type Props = {
  orders: Order[];
};

export default function OrdersList({ orders }: Props) {
  const [activeOrders, setActiveOrders] = useState<string[]>([]);

  const handleOpen = (index: string) => {
    const candidate = activeOrders.includes(index);
    if (candidate) {
      setActiveOrders((prev) => prev.filter((idx) => idx !== index));
    } else {
      setActiveOrders((prev) => [...prev, index]);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      {orders.map((order, index) => (
        <Fragment key={index}>
          {/** Mobile only */}
          <OrderDetailsMobile
            handleReveal={handleOpen}
            order={order}
            revealedOrders={activeOrders}
          />
          {/** Mobile only */}

          {/** Big screens only */}
          <OrderDetails
            handleReveal={handleOpen}
            order={order}
            revealedOrders={activeOrders}
          />
          {/** Big screens only */}
        </Fragment>
      ))}
    </div>
  );
}
