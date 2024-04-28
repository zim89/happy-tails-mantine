'use client';
import { useState } from 'react';
import { Textarea, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit2, AlertTriangle, Check } from 'lucide-react';

import { useNotification } from '@/shared/hooks/useNotification';
import Notify from '@/components/Notify';
import { useAddCommentMutation } from "@/shared/api/ordersApi";

type Props = {
  orderNumber: string;
  commentOfManager: string;
}

export const CommentSection = ({ orderNumber, commentOfManager }: Props) => {
  const [comment, setComment] = useState('');
  const [areCommentsOpened, { close: closeComments, toggle: toggleComments }] =
    useDisclosure(false);
  const [dispatch] = useAddCommentMutation();

  const [setNotification, { props, clear }] = useNotification({
    failed: {
      text: 'Failed to add comment.',
      color: 'transparent',
      icon: <AlertTriangle size={24} fill='#DC362E' />,
    },
    success: {
      text: 'Comment posted!',
      icon: <Check size={24} />,
      color: '#389B48',
    },
  });

  const closeSection = () => {
    setComment('');
    closeComments();
  };

  const sendFeedback = async () => {
    try {
      await dispatch({ comment, orderNumber }).unwrap();
      closeSection();
      setNotification('Success');
    } catch (err) {
      if (err instanceof Error) setNotification('Failed', err.message);
    }
  };

  return (
    <div className='col-span-2 rounded-[4px] border-[1px] border-[#EEE] bg-white'>
      <div className='flex items-center justify-between border-b-[1px] border-[#EEE] p-4'>
        <h2 className='text-xl font-bold'>Comments</h2>
        <Button
          classNames={{
            root: 'border-[1px] border-[#C8C8C8] w-[36px] h-[36px] p-0',
          }}
          onClick={toggleComments}
        >
          <Edit2 size={16} color='black' />
        </Button>
      </div>
      {areCommentsOpened ? (
        <div className='p-4'>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            label='Add comments'
            rows={10}
            mb={22}
          />
          <Button
            px={50}
            mr={42}
            radius={2}
            c='black'
            classNames={{ root: 'border-[1px] border-[#EEE]' }}
            onClick={closeComments}
          >
            Cancel
          </Button>
          <Button px={50} radius={2} bg='black' onClick={sendFeedback}>
            Save
          </Button>
        </div>
      ) : (
        <div className="p-4">
          {commentOfManager}
        </div>
      )}
      <Notify {...props} onClose={clear} />
    </div>
  );
};