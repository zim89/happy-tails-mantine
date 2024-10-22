'use client';

import { ActionIcon, Menu } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
import { Eye, MoreHorizontal, Trash } from 'lucide-react';
import Link from 'next/link';

import { Order } from '@/shared/types/types';
import DeleteOrderModal from '@/modules/DeleteOrderModal';
import { useSearchParams } from 'next/navigation';

export const RowActions = ({ ctx }: { ctx: CellContext<Order, unknown> }) => {
  const order = ctx.row.original;
  const searchParams = useSearchParams();
  const page = searchParams.get('page');

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
              href={`/admin/orders/${ctx.row.original.number}?fromPage=${page}`}
            >
              <Eye />
              View
            </Link>
          </Menu.Item>
          <Menu.Item
            leftSection={<Trash />}
            className='rounded-none hover:bg-brand-grey-200'
          >
            <DeleteOrderModal orderLine={order} />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
