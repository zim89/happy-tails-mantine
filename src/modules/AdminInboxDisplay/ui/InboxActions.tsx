import { Loader, Menu, UnstyledButton } from '@mantine/core';
import { Eye, MoreHorizontal, MessageSquareDot } from 'lucide-react';
import Link from 'next/link';

import DeleteMessagesModal from '@/modules/DeleteMessagesModal';
import type { Feedback, FeedbackStatus } from '@/shared/types/feedback.types';
import { useState } from 'react';
import { useUpdateStatusMutation } from '@/shared/api/feedbackApi';
import { toast } from 'react-toastify';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { FEEDBACK_STATUS } from '@/shared/constants/feedback.const';
import { useSearchParams } from 'next/navigation';

export const InboxActions = ({ message }: { message: Feedback }) => {
  const [markAsRead] = useUpdateStatusMutation();
  const params = useSearchParams();
  const page = params.get('page');

  const [loading, setLoading] = useState(false);

  const handleMarkAsRead = async () => {
    const status: FeedbackStatus =
      message.feedbackStatus === FEEDBACK_STATUS.NEW
        ? FEEDBACK_STATUS.REVIEWING
        : FEEDBACK_STATUS.NEW;

    try {
      setLoading(true);
      await markAsRead({
        id: message.id,
        status,
      }).unwrap();
      toast.success(
        status === FEEDBACK_STATUS.NEW
          ? 'Feedback marked as unread!'
          : 'Feedback marked as read!'
      );
    } catch (err) {
      if (isAxiosQueryError(err)) {
        toast.error(isErrorDataString(err.data) ? err.data : err.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='m-4 flex justify-end gap-4'>
      <Menu width={148} position='bottom-end' keepMounted>
        <Menu.Target>
          <UnstyledButton
            classNames={{
              root: 'flex items-center justify-center border border-solid border-brand-grey-400 hover:bg-brand-grey-600 p-2 rounded-sm',
            }}
          >
            {loading ? (
              <Loader size={16} color='black' />
            ) : (
              <MoreHorizontal size={16} color='black' />
            )}
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className='p-0 py-2'>
          <Menu.Item
            leftSection={<Eye size={16} />}
            className='mb-1 rounded-none hover:bg-brand-grey-200'
          >
            <Link href={`/admin/inbox/${message.id}?fromPage=${page}`}>
              View
            </Link>
          </Menu.Item>
          <Menu.Item
            leftSection={<MessageSquareDot size={16} />}
            className='mb-1 rounded-none hover:bg-brand-grey-200'
            onClick={handleMarkAsRead}
          >
            {message.feedbackStatus === FEEDBACK_STATUS.NEW
              ? 'Mark as read'
              : 'Mark as unread'}
          </Menu.Item>
          <Menu.Item className='rounded-none hover:bg-brand-grey-200'>
            <DeleteMessagesModal messages={[message.id]} />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
