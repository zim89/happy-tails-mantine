'use client';
import { useState } from 'react';
import { Badge, Button } from '@mantine/core';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { formatRawOrderDate } from '@/shared/lib/helpers';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { Order } from '@/shared/types/types';

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
    <>
      {orders.map((order) => (
        <div
          key={order.number}
          className='mb-2 border-b-[1px] border-[#EEEEEE]'
        >
          {activeOrders.includes(order.number) && (
            <div
              className='rounded-se-lg rounded-ss-lg py-1 text-center text-xs font-bold uppercase text-white md:hidden'
              style={{
                backgroundColor:
                  order.orderStatus === 'Shipped' ? '#389B48' : '#FBBC04',
              }}
            >
              {order.orderStatus}
            </div>
          )}
          <div
            className={cn(
              'grid grid-cols-3 items-center border-x-[1px] border-t-[1px] border-[#EEEEEE] p-4 md:grid-cols-5',
              activeOrders.includes(order.number) &&
                'grid-cols-[50px_auto_auto] grid-rows-2 md:grid-rows-1'
            )}
          >
            <Image
              className={cn(
                activeOrders.includes(order.number) && 'order-3 md:order-none'
              )}
              width={50}
              height={50}
              src='https://cdn.shopify.com/s/files/1/0702/9579/files/all-for-paws-afp-k-nite-glowing-stick-29509698879590.jpg?v=1692337333'
              alt=''
            />

            <div
              className={cn(
                'text-sm',
                activeOrders.includes(order.number) &&
                  'col-span-2 md:col-span-1'
              )}
            >
              <span>№ {order.number} from </span>
              <time>{formatRawOrderDate(order.createdDate)}</time>
            </div>

            {/* Only from laptops */}
            <Badge
              className='ml-4 hidden md:block'
              color={order.orderStatus === 'Shipped' ? '#389B48' : '#FBBC04'}
            >
              {order.orderStatus}
            </Badge>
            {/* Only from laptops */}

            <div
              className={cn(
                'ml-auto hidden flex-col text-center text-xs md:flex',
                activeOrders.includes(order.number) &&
                  'order-4 flex w-full md:order-none md:w-auto'
              )}
            >
              <span>Order amount</span>
              <span className='pt-[6px] text-sm'>{order.price}$</span>
            </div>

            <button
              onClick={() => handleOpen(order.number)}
              className='col-span-1 justify-self-end rounded-sm border-[1px] border-[#C8C8C8] p-[10px]'
            >
              {activeOrders.includes(order.number) ? (
                <ChevronDown color='black' size={16} />
              ) : (
                <ChevronUp color='black' size={16} />
              )}
            </button>
          </div>

          {activeOrders.includes(order.number) && (
            <div className='flex items-center border-x-[1px] border-[#EEEEEE] p-4'>
              <p className='flex items-center gap-2 text-sm text-orange-500'>
                <FileText className='inline' size={12} /> Electronic check
              </p>
              <div className='ml-auto flex flex-col md:flex-row gap-4'>
                <Button className='bg-black'>Repeat the order</Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
