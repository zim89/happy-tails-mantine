import { useDeleteOrderMutation } from '@/shared/api/ordersApi';
import { useAuth } from '@/shared/hooks/useAuth';
import { Order } from '@/shared/types/types';
import { ActionIcon, Menu } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
import { Eye, MoreHorizontal, Trash } from 'lucide-react';
import Link from 'next/link';

export const RowActions = ({ ctx }: { ctx: CellContext<Order, unknown> }) => {
  const { access_token } = useAuth();
  const [dispatch] = useDeleteOrderMutation();
  const order = ctx.row.original;

  const handleDelete = async () => {
    try {
      const res = await dispatch({ token: access_token, number: order.number });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
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
          <Link href={`/admin/orders/${ctx.row.original.number.toLowerCase()}`}>View</Link>
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
  );
};
