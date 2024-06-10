'use client';

import { Menu, UnstyledButton } from '@mantine/core';
import { MoreHorizontal, MessageSquareDot } from 'lucide-react';

type Props = {
  messageId: string;
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
            leftSection={<MessageSquareDot size={16} />}
            className='mb-1 rounded-none hover:bg-brand-grey-200'
          >
            Mark as read
          </Menu.Item>
          <Menu.Item className='rounded-none hover:bg-brand-grey-200'>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
