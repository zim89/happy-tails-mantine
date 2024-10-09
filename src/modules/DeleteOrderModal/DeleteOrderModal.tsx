'use client';

import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

import DeleteModal from '@/components/DeleteModal';
import { Order } from '@/shared/types/types';

import {
  brandNotification,
  isAxiosQueryError,
  isErrorDataString,
} from '@/shared/lib/helpers';
import { useDeleteOrderMutation } from '@/shared/api/ordersApi';

type Props = {
  orderLine: Order;
};

export default function DeleteOrderModal({ orderLine }: Props) {
  const [dispatch] = useDeleteOrderMutation();
  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async () => {
    try {
      await dispatch({ number: orderLine.number }).unwrap();
      brandNotification('SUCCESS', 'Successfully deleted!');
      close();
    } catch (err) {
      close();
      if (isAxiosQueryError(err)) {
        brandNotification(
          'ERROR',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      }
      console.error(err);
    }
  };

  return (
    <DeleteModal>
      {(Modal) => (
        <>
          {/* Opens a modal window */}
          <span onClick={open} className='block p-0 text-black'>
            Delete
          </span>

          <Modal
            onClose={close}
            opened={opened}
            footerProps={{
              singleBtn: false,
              secondaryBtnOnClick: close,
              secondaryBtnText: 'Cancel',
              primaryBtnOnClick: handleDelete,
              primaryBtnText: 'Delete',
              containerStyles: {
                display: 'flex',
                justifyContent: 'end',
                marginTop: '32px',
              },
            }}
          >
            <div className='flex items-center gap-3'>
              <Image
                src='/icons/file_attention.svg'
                alt=''
                width={64}
                height={64}
              />
              <hgroup>
                <h2 className='mb-3 font-bold'>{`Delete order #${orderLine.number}?`}</h2>
                <p>Are you sure you want to delete the selected order?</p>
              </hgroup>
            </div>
          </Modal>
        </>
      )}
    </DeleteModal>
  );
}
