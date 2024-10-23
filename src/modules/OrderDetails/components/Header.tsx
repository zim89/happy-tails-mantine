'use client';

import dayjs from 'dayjs';

import { CustomBadge } from '@/components/Badge/Badge';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import type { Order } from '@/shared/types/types';
import { useSearchParams } from 'next/navigation';

type Props = {
  order: Order;
};

export const Header = ({ order }: Props) => {
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
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='mb-1 text-[2rem]/[2.4rem] font-bold'>
            Order #{order.number}
          </h1>
          <div className='flex items-center gap-1'>
            <span className='whitespace-pre'>
              {dayjs.unix(order.createdDate).format('MMM DD, YYYY HH:mm:ss A')}
            </span>
            <CustomBadge
              color={order.orderStatus.toLowerCase()}
              name={order.orderStatus}
            />
          </div>
        </div>
      </div>
    </>
  );
};
