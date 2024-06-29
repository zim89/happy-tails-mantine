'use client';

import dayjs from 'dayjs';
import { Loader, UnstyledButton } from '@mantine/core';
import { Mail } from 'lucide-react';
import { useContext, useState } from 'react';

import { CustomBadge } from '@/components/Badge/Badge';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { Order } from '@/shared/types/types';
import { mockLongRequest } from '@/shared/lib/helpers';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { notifyContext } from '@/shared/context/notification.context';

type Props = {
  order: Order;
};

export const Header = ({ order }: Props) => {
  const [isResending, setIsResending] = useState(false);
  const { setNotification } = useContext(notifyContext);

  const resend = async () => {
    try {
      setIsResending(true);
      await mockLongRequest();
      setIsResending(false);
      setNotification(
        'Success',
        'Order confirmation email has been successfully resent'
      );
    } catch (err) {
      setIsResending(false);
      if (isAxiosQueryError(err)) {
        console.error(err);
        setNotification(
          'Failed',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      }
    }
  };

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { href: '/admin/', text: 'Dashboard' },
          { href: '/admin/orders', text: 'Orders' },
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
              {dayjs(order.createdDate).format('MMM DD, YYYY HH:mm:ss A')}
            </span>
            <CustomBadge
              color={order.orderStatus.toLowerCase()}
              name={order.orderStatus}
            />
          </div>
        </div>
        <UnstyledButton
          classNames={{
            root: 'ml-auto text-black hover:text-primary hover:bg-secondary font-bold flex items-center gap-2 px-4 py-3 rounded-sm ',
          }}
          styles={{ root: { border: '1px solid #C8C8C8' } }}
          onClick={resend}
        >
          {isResending ? (
            <>
              <Loader size={15} classNames={{ root: 'px-1 mr-3' }} />
              <span>Resending email</span>
            </>
          ) : (
            <>
              <Mail size={20} />
              Resend order confirmation email
            </>
          )}
        </UnstyledButton>
      </div>
    </>
  );
};
