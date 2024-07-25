'use client';

import { useContext, useState } from 'react';
import { Textarea, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit2 } from 'lucide-react';

import { useAddCommentMutation } from '@/shared/api/ordersApi';
import { notifyContext } from '@/shared/context/notification.context';

type Props = {
  orderNumber: string;
  commentOfManager: string;
};

export const CommentSection = ({ orderNumber, commentOfManager }: Props) => {
  const [comment, setComment] = useState('');
  const [areCommentsOpened, { close: closeComments, toggle: toggleComments }] =
    useDisclosure(false);
  const [dispatch] = useAddCommentMutation();
  const { setNotification } = useContext(notifyContext);

  const closeSection = () => {
    setComment('');
    closeComments();
  };

  const sendFeedback = async () => {
    try {
      await dispatch({ comment, orderNumber }).unwrap();
      closeSection();
      setNotification('Success', 'Comment posted!');
    } catch (err) {
      if (err instanceof Error) setNotification('Failed', err.message);
    }
  };

  return (
    <div className='col-span-2 rounded-[4px] border-[1px] border-[#EEE] bg-white'>
      <div className='flex items-center justify-between border-b-[1px] border-[#EEE] p-4'>
        <h2 className='text-xl font-bold'>Comments</h2>
        <UnstyledButton
          classNames={{
            root: 'p-[10px] rounded-sm',
          }}
          styles={{ root: { border: '1px solid #C8C8C8' } }}
          onClick={toggleComments}
        >
          <Edit2 size={16} color='black' />
        </UnstyledButton>
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
          <UnstyledButton
            mr={42}
            classNames={{
              root: 'rounded-sm text-black py-[10px] px-[47px] font-bold',
            }}
            styles={{ root: { border: '1px solid #C8C8C8' } }}
            onClick={closeComments}
          >
            Cancel
          </UnstyledButton>
          <UnstyledButton
            classNames={{
              root: 'bg-black text-white rounded-sm py-[10px] px-[55px] font-bold',
            }}
            onClick={sendFeedback}
          >
            Save
          </UnstyledButton>
        </div>
      ) : (
        <div className='p-4'>{commentOfManager}</div>
      )}
    </div>
  );
};
