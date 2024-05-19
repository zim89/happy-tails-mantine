import { CellContext } from '@tanstack/react-table';
import { AlertTriangle, Check, MoreHorizontal, Trash2, User2 } from 'lucide-react';

import { User } from '@/shared/types/auth.types';
import { ActionIcon, Menu } from '@mantine/core';
import { useNotification } from '@/shared/hooks/useNotification';
import Notify from '@/components/Notify';
import DeleteUserModal from "@/modules/DeleteUserModal"
import Link from 'next/link';

type Props = {
  ctx: CellContext<User, unknown>;
};
export const Actions = ({ ctx }: Props) => {
  const [setNotification, { props, clear }] = useNotification({
    failed: {
      text: 'User deletion failed!',
      icon: <AlertTriangle size={24} fill="#DC362E" />,
      color: 'transparent',
    },
    success: {
      text: 'User successfully deleted!',
      icon: <Check size={24} />,
      color: '#389B48',
    }
  });

  return (
    <div className="flex justify-end">
      {/* "keepMounted" is used to prevent re-rendering its children which causes flickering */}
      <Menu width={148} position='bottom-end' keepMounted>
        <Menu.Target>
          <ActionIcon className='size-9 border border-brand-grey-400 bg-primary text-secondary hover:bg-brand-grey-300 hover:text-secondary data-[expanded=true]:bg-brand-grey-300'>
            <MoreHorizontal size={16} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown className='p-0 py-2'>
          <Menu.Item
            leftSection={<User2 size={16} />}
            className='mb-1 rounded-none hover:bg-brand-grey-200'
          >
            <Link href={`/admin/users/${ctx.row.original.userId}`}>
              View
            </Link>
          </Menu.Item>
          <Menu.Item
            leftSection={<Trash2 size={16} />}
            className='rounded-none hover:bg-brand-grey-200'
          >
            <DeleteUserModal user={ctx.row.original} setNotification={setNotification} />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {/* Forced to move notifications here, cause I don't want them appear only in opened dropdown menu */}
      <Notify {...props} onClose={clear}/>
    </div>
  );
};
