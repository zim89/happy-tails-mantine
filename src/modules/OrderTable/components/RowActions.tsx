'use client';
import { ActionIcon, Menu } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
import { AlertTriangle, Check, Eye, MoreHorizontal, Trash } from 'lucide-react';
import Link from 'next/link';

import Notify from '@/components/Notify';
import { useDeleteOrderMutation } from '@/shared/api/ordersApi';
import { Order } from '@/shared/types/types';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { useNotification } from '@/shared/hooks/useNotification';

export const RowActions = ({ ctx }: { ctx: CellContext<Order, unknown> }) => {
  const [setNotification, { props, clear }] = useNotification({
    failed: {
      text: 'Deleting is failed!',
      icon: <AlertTriangle size={24} fill='#DC362E' />,
      color: 'transparent',
    },
    success: {
      text: 'Successfully deleted!',
      icon: <Check size={24} />,
      color: '#389B48',
    }
  })
  const [dispatch] = useDeleteOrderMutation();
  const order = ctx.row.original;

  const handleDelete = async () => {
    try {
      await dispatch({ number: order.number }).unwrap();
      setNotification('Success');
    } catch (err) {
      if (isAxiosQueryError(err)) {
        setNotification('Failed', isErrorDataString(err.data) ? err.data : err.data.message);
      }
      console.error(err);
    }
  };

  return (
    <>
      <Menu width={148} position='bottom-end'>
        <Menu.Target>
          <ActionIcon className='size-9 border border-brand-grey-400 bg-primary text-secondary hover:bg-brand-grey-300 data-[expanded=true]:bg-brand-grey-300'>
            <MoreHorizontal size={16} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown className='p-0 py-2'>
          <Menu.Item
            leftSection={<Eye />}
            className='mb-1 rounded-none hover:bg-brand-grey-200'
          >
            <Link
              href={`/admin/orders/${ctx.row.original.number.toLowerCase()}`}
            >
              View
            </Link>
          </Menu.Item>
          <Menu.Item
            leftSection={<Trash />}
            className='rounded-none hover:bg-brand-grey-200'
            onClick={handleDelete}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Notify {...props} onClose={clear} />      
    </>
  );
};
