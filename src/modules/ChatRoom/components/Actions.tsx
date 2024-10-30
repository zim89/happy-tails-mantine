'use client';

import {
  useRemoveMutation,
  useToggleStarredMutation,
  useUpdateStatusMutation,
} from '@/shared/api/feedbackApi';
import { FEEDBACK_STATUS } from '@/shared/constants/feedback.const';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { cn } from '@/shared/lib/utils';
import type { Feedback } from '@/shared/types/feedback.types';
import { Menu, UnstyledButton, Loader } from '@mantine/core';
import { MoreHorizontal, Mail, Trash2, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const Actions = ({ message }: { message: Feedback }) => {
  const [remove] = useRemoveMutation();
  const [markAsRead] = useUpdateStatusMutation();
  const [toggleStarred] = useToggleStarredMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStarred = async () => {
    try {
      setLoading(true);
      await toggleStarred(message.id).unwrap();
      toast.success(
        message.starred ? 'Feedback unstarred!' : 'Feedback starred!'
      );
    } catch (err) {
      if (isAxiosQueryError(err)) {
        toast.error(isErrorDataString(err.data) ? err.data : err.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async () => {
    const status = message.feedbackStatus === 'NEW' ? 'REVIEWING' : 'NEW';
    try {
      setLoading(true);
      await markAsRead({ id: message.id, status }).unwrap();
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

  const handleDelete = async () => {
    try {
      setLoading(true);
      await remove({ id: message.id }).unwrap();
      toast.success('Feedback successfully deleted!');
      router.push('/admin/inbox');
    } catch (err) {
      if (isAxiosQueryError(err)) {
        toast.error(isErrorDataString(err.data) ? err.data : err.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-end gap-4'>
      <Menu width={148} position='bottom-end' keepMounted>
        <Menu.Target>
          <UnstyledButton
            disabled={loading}
            classNames={{
              root: 'flex items-center justify-center border border-solid border-black hover:bg-brand-grey-400 p-2 rounded-[2px]',
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
