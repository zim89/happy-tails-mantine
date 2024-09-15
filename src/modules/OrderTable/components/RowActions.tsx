'use client';

import { ActionIcon, Menu } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
import { Eye, MoreHorizontal, Trash } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';

import { Order } from '@/shared/types/types';
import { notifyContext } from '@/shared/context/notification.context';
import DeleteOrderModal from '@/modules/DeleteOrderModal/DeleteOrderModal';

export const RowActions = ({ ctx }: { ctx: CellContext<Order, unknown> }) => {
  const { setNotification } = useContext(notifyContext);
  const order = ctx.row.original;

  return (
    <>
      <Menu width={148} position='bottom-end' keepMounted>
        <Menu.Target>
          <ActionIcon className='size-9 border border-brand-grey-400 bg-primary text-secondary hover:bg-brand-grey-300 data-[expanded=true]:bg-brand-grey-300'>
            <MoreHorizontal size={16} color='black' />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown className='p-0 py-2'>
          <Menu.Item className='mb-1 rounded-none hover:bg-brand-grey-200'>
            <Link
              className='flex h-full w-full items-center gap-3'
              shallow
              href={`/admin/orders/${ctx.row.original.number.toLowerCase()}`}
            >
              <Eye />
              View
            </Link>
          </Menu.Item>
          <Menu.Item
            leftSection={<Trash />}
            className='rounded-none hover:bg-brand-grey-200'
          >
            <DeleteOrderModal
              orderLine={order}
              setNotification={setNotification}
            />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
