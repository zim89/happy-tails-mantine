import { CellContext } from '@tanstack/react-table';
import { MoreHorizontal, Trash2, User2 } from 'lucide-react';

import { User } from '@/shared/types/auth.types';
import { ActionIcon, Menu } from '@mantine/core';
import DeleteUserModal from '@/modules/DeleteUserModal';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Props = {
  ctx: CellContext<User, unknown>;
};
export const Actions = ({ ctx }: Props) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page'));

  return (
    <div className='flex justify-end'>
      {/* "keepMounted" is used to prevent re-rendering its children which causes flickering */}
      <Menu width={148} position='bottom-end' keepMounted>
        <Menu.Target>
          <ActionIcon className='size-9 border border-brand-grey-400 bg-primary text-secondary hover:bg-brand-grey-300 hover:text-secondary data-[expanded=true]:bg-brand-grey-300'>
            <MoreHorizontal size={16} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown className='p-0 py-2'>
          <Menu.Item className='mb-1 rounded-none p-0 hover:bg-brand-grey-200'>
            <Link
              shallow
              className='flex h-full w-full items-center gap-3 px-3 py-2'
              href={`/admin/users/${ctx.row.original.userId}?fromPage=${page}`}
            >
              <User2 size={16} />
              View
            </Link>
          </Menu.Item>
          <Menu.Item
            leftSection={<Trash2 size={16} />}
            className='rounded-none hover:bg-brand-grey-200'
          >
            <DeleteUserModal user={ctx.row.original} />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
