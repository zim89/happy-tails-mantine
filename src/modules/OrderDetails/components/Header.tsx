'use client';
import dayjs from 'dayjs';
import { Button, Loader } from '@mantine/core';
import { Check, Mail, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

import { CustomBadge } from '@/components/Badge';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { Order } from '@/shared/types/types';
import { HistoryModal } from './HistoryModal';
import { mockLongRequest } from '@/shared/lib/helpers';
import Notify, { NotifyProps } from '@/components/Notify';

type Props = {
  order: Order;
};

export const Header = ({ order }: Props) => {
  const [isResending, setIsResending] = useState(false);
  const [notificationType, setNotificationType] = useState('');

  const resend = async () => {
    try {
      setIsResending(true);
      await mockLongRequest();
      setIsResending(false);
      setNotificationType('Success');
    } catch (err) {
      setIsResending(false);
      setNotificationType('Failed');
    }
  };

  const notifyProps: Omit<NotifyProps, 'onClose'> | null =
    notificationType === 'Success'
      ? {
          kind: 'success',
          color: '#389B48',
          visible: true,
          icon: <Check size={20} />,
          text: 'Order Confirmation Email has been successfully resent',
        }
      : notificationType === 'Failed'
        ? {
            kind: 'fail',
            classNames: { icon: 'bg-transparent' },
            color: '#DC362E',
            visible: true,
            icon: <AlertTriangle size={20} fill='#DC362E' />,
            text: 'Error Resending Order Confirmation Email!',
          }
        : null;

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { href: '/admin/', text: 'Admin' },
          { href: '/admin/orders', text: 'Order' },
          { text: 'Details' },
        ]}
      />
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-[32px] font-bold'>Order #{order.number}</h1>
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

      {notifyProps && (
        <Notify {...notifyProps} onClose={() => setNotificationType('')} />
      )}
    </>
  );
};
