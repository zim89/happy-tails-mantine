import { Order } from '@/shared/types/types';
import { ActionIcon, Menu } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
import { Eye, MoreHorizontal, Trash } from 'lucide-react';

export const RowActions = ({ ctx }: { ctx: CellContext<Order, unknown> }) => {
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
          View
        </Menu.Item>
        <Menu.Item
          leftSection={<Trash />}
          className='rounded-none hover:bg-brand-grey-200'
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
