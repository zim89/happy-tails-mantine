'use client';

import { Menu, UnstyledButton } from '@mantine/core';
import { MoreHorizontal, Mail, Trash2, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  useRemoveMutation,
  useToggleStarredMutation,
  useUpdateStatusMutation,
} from '@/shared/api/feedbackApi';
import { FEEDBACK_STATUS } from '@/shared/constants/feedback.const';
import { brandNotification, handleDispatchError } from '@/shared/lib/helpers';
import { cn } from '@/shared/lib/utils';
import type { Feedback } from '@/shared/types/feedback.types';

export const Actions = ({ message }: { message: Feedback }) => {
  const [remove] = useRemoveMutation();
  const [markAsRead] = useUpdateStatusMutation();
  const [toggleStarred] = useToggleStarredMutation();
  const router = useRouter();

  const handleStarred = async () => {
    try {
      brandNotification(
        'SUCCESS',
        message.starred ? 'Feedback unstarred!' : 'Feedback starred!'
      );
      await toggleStarred(message.id).unwrap();
    } catch (err) {
      handleDispatchError(err);
    }
  };

  const handleMarkAsRead = async () => {
    const status = message.feedbackStatus === 'NEW' ? 'REVIEWING' : 'NEW';
    try {
      brandNotification(
        'SUCCESS',
        status === FEEDBACK_STATUS.NEW
          ? 'Feedback marked as unread!'
          : 'Feedback marked as read!'
      );
      await markAsRead({ id: message.id, status }).unwrap();
    } catch (err) {
      handleDispatchError(err);
    }
  };

  const handleDelete = async () => {
    try {
      brandNotification('SUCCESS', 'Feedback successfully deleted!');
      router.push('/admin/inbox');
      await remove({ id: message.id }).unwrap();
    } catch (err) {
      handleDispatchError(err);
    }
  };

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
            onClick={handleStarred}
            leftSection={
              <Star
                size={16}
                className={cn(
                  message.starred
                    ? 'fill-brand-yellow stroke-brand-yellow'
                    : 'fill-primary stroke-secondary'
                )}
              />
            }
            className='mb-1 rounded-none hover:bg-brand-grey-200'
          >
            {message.starred ? 'Set unstarred' : 'Set starred'}
          </Menu.Item>
          <Menu.Item
            onClick={handleMarkAsRead}
            leftSection={<Mail size={16} />}
            className='mb-1 rounded-none hover:bg-brand-grey-200'
          >
            {message.feedbackStatus === 'NEW'
              ? 'Mark as read'
              : 'Mark as unread'}
          </Menu.Item>
          <Menu.Item
            onClick={handleDelete}
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
