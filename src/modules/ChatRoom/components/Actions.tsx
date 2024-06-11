'use client';

import { Menu, UnstyledButton } from '@mantine/core';
import { MoreHorizontal, Mail, Trash2, Star } from 'lucide-react';

type Props = {
  messageId: number;
};

export const Actions = ({ messageId }: Props) => {
  return (
    <div className='flex justify-end gap-4'>
      <Menu width={148} position='bottom-end' keepMounted>
        <Menu.Target>
          <UnstyledButton
            classNames={{
              root: 'flex items-center justify-center border border-solid border-black hover:bg-brand-grey-400 p-2 rounded-[2px]',
            }}
          >
            <MoreHorizontal size={16} color='black' />
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className='p-0 py-2'>
          <Menu.Item
            leftSection={<Star size={16} />}
            className='mb-1 rounded-none hover:bg-brand-grey-200'
          >
            Unstarred
          </Menu.Item>
          <Menu.Item
            leftSection={<Mail size={16} />}
            className='mb-1 rounded-none hover:bg-brand-grey-200'
          >
            Mark as read
          </Menu.Item>
          <Menu.Item
            className='rounded-none hover:bg-brand-grey-200'
            leftSection={<Trash2 size={16} />}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
