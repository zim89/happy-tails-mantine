'use client';

import { useState } from 'react';
import { Textarea, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit2 } from 'lucide-react';

import { useUpdateOrderMutation } from '@/shared/api/ordersApi';
import { brandNotification } from '@/shared/lib/helpers';
import { Order } from '@/shared/types/types';

type Props = {
  order: Order;
};

export const CommentSection = ({ order }: Props) => {
  const [comment, setComment] = useState('');
  const [areCommentsOpened, { close: closeComments, toggle: toggleComments }] =
    useDisclosure(false);
  const [dispatch] = useUpdateOrderMutation();

  const closeSection = () => {
    setComment('');
    closeComments();
  };

  const sendFeedback = async () => {
    try {
      let request = {
        orderNumber: order.number,
        paymentMethod: order.paymentMethod,
        shippingAddress: order.shippingAddress,
        billingAddress: order.billingAddress,
        shippingMethodId: order.shippingMethodDTO.id,
        commentOfManager: comment,
      };

      await dispatch(request).unwrap();
      closeSection();
      brandNotification('SUCCESS', 'Comment posted!');
    } catch (err) {
      if (err instanceof Error) brandNotification('ERROR', err.message);
    }
  };

  return (
    <div className='col-span-1 rounded-[4px] border border-brand-grey-300 bg-white lg:col-span-2'>
      <div className='flex items-center justify-between border-b border-brand-grey-300 p-4'>
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
              root: 'rounded-sm w-full text-center lg:w-auto text-black py-[10px] px-[47px] font-bold',
            }}
            styles={{ root: { border: '1px solid #C8C8C8' } }}
            onClick={closeComments}
          >
            Cancel
          </UnstyledButton>
          <UnstyledButton
            classNames={{
              root: 'bg-black text-white w-full text-center lg:w-auto rounded-sm py-[10px] px-[55px] font-bold',
            }}
            onClick={sendFeedback}
          >
            Save
          </UnstyledButton>
        </div>
      ) : (
        <div className='p-4'>{order.commentOfManager}</div>
      )}
    </div>
  );
};
