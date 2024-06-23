import { Menu, UnstyledButton } from '@mantine/core';
import { Eye, MoreHorizontal, MessageSquareDot } from 'lucide-react';
import Link from 'next/link';

import { Message } from '../lib/mock';
import DeleteMessagesModal from '@/modules/DeleteMessagesModal';

type Props = {
  message: Message;
  setNotification: (type: 'Success' | 'Failed', text?: string) => void;
  setMarked: (msgs: number[]) => void;
};

export const Actions = ({ message, setNotification, setMarked }: Props) => {
  return (
    <div className='m-4 flex justify-end gap-4'>
      <Menu width={148} position='bottom-end' keepMounted>
        <Menu.Target>
          <UnstyledButton
            classNames={{
              root: 'flex items-center justify-center border border-solid border-brand-grey-400 hover:bg-brand-grey-600 p-2 rounded-sm',
            }}
          >
            <MoreHorizontal size={16} color='black' />
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className='p-0 py-2'>
          <Menu.Item
            leftSection={<Eye size={16} />}
            className='mb-1 rounded-none hover:bg-brand-grey-200'
          >
            <Link href={`/admin/inbox/${message.threadId}`}>View</Link>
          </Menu.Item>
          <Menu.Item
            leftSection={<MessageSquareDot size={16} />}
            className='mb-1 rounded-none hover:bg-brand-grey-200'
            onClick={() => setMarked([message.id])}
          >
            Mark as read
          </Menu.Item>
          <Menu.Item className='rounded-none hover:bg-brand-grey-200'>
            <DeleteMessagesModal
              setNotification={setNotification}
              messages={[message.id]}
            />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
