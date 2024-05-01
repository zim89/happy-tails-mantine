'use client';
import dayjs from 'dayjs';
import { Button, Loader } from '@mantine/core';
import { Check, Mail, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

import { CustomBadge } from '@/components/Badge/Badge';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { Order } from '@/shared/types/types';
import { HistoryModal } from './HistoryModal';
import { mockLongRequest } from '@/shared/lib/helpers';
import Notify from '@/components/Notify';
import { useNotification } from '@/shared/hooks/useNotification';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';

type Props = {
  order: Order;
};

export const Header = ({ order }: Props) => {
  const [isResending, setIsResending] = useState(false);
  const [setNotification, { props, clear }] = useNotification({
    failed: {
      color: 'transparent',
      icon: <AlertTriangle size={24} fill='#DC362E' />,
      text: 'Error Resending Order Confirmation Email!',
    },
    success: {
      color: '#389B48',
      icon: <Check size={24} />,
      text: 'Order Confirmation Email has been successfully resent',
    },
  });

  const resend = async () => {
    try {
      setIsResending(true);
      await mockLongRequest();
      setIsResending(false);
      setNotification('Success');
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
          root: "p-0 m-0 mb-8"
        }}
      />
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-[32px]/[38.4px] mb-1 font-bold'>Order #{order.number}</h1>
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
        <Button
          classNames={{
            root: 'border-[1px] border-[#EEEEEE] ml-auto mr-3 text-black w-[302px]',
          }}
          onClick={resend}
        >
          {isResending ? (
            <>
              <Loader
                size={15}
                classNames={{ root: 'px-1 mr-3' }}
                color='#A0A0A0'
              />
              <span className='text-[#A0A0A0]'>Resending email</span>
            </>
          ) : (
            <>
              <Mail size={20} color='black' className='mr-2' />
              Resend order confirmation email
            </>
          )}
        </Button>
        <HistoryModal />
      </div>

      <Notify {...props} onClose={clear} />
    </>
  );
};
