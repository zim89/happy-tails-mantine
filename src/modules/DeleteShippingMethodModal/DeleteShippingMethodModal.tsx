import { UnstyledButton } from '@mantine/core';
import Image from 'next/image';
import { useDisclosure } from '@mantine/hooks';
import { Trash2 } from 'lucide-react';

import DeleteModal from '@/components/DeleteModal';

import classes from './classes.module.css';
import { brandNotification, handleDispatchError } from '@/shared/lib/helpers';
import { ShippingMethod } from '@/shared/types/shippingMethod.types';
import { useDeleteShippingMethodMutation } from '@/shared/api/shippingMethodsApi';

type Props = {
  shippingMethod: ShippingMethod;
};

export default function DeleteShippingMethodModal({ shippingMethod }: Props) {
  const [deleteShippingMethod] = useDeleteShippingMethodMutation();

  const handleDelete = async () => {
    try {
      closeMain();
      brandNotification('SUCCESS', 'Shipping method successfully deleted!');

      await deleteShippingMethod(shippingMethod.id).unwrap();
    } catch (err) {
      closeMain();
      handleDispatchError(err);
      console.error('Deleting failed: ', err);
    }
  };

  const [openedMain, { open: openMain, close: closeMain }] =
    useDisclosure(false);

  return (
    <DeleteModal>
      {(Modal) => {
        return (
          <>
            {/* Button to open main modal */}
            <UnstyledButton
              onClick={openMain}
              style={{
                border: '1px solid #C8C8C8',
              }}
              className='ml-3 rounded-sm bg-white p-[10px] hover:bg-brand-grey-100'
            >
              <Trash2 size={16} strokeWidth={3} />
            </UnstyledButton>

            <Modal
              onClose={closeMain}
              opened={openedMain}
              footerProps={{
                singleBtn: false,
                secondaryBtnOnClick: closeMain,
                secondaryBtnText: 'Cancel',
                primaryBtnOnClick: handleDelete,
                primaryBtnText: 'Delete',
                containerStyles: {
                  display: 'flex',
                  justifyContent: 'end',
                  marginTop: 24,
                },
              }}
            >
              <div className={classes.message}>
                <Image
                  src='/icons/file_attention.svg'
                  width={64}
                  height={64}
                  alt=''
                />
                <hgroup>
                  <h2>{`Are you sure you want to delete the ${shippingMethod.name} method?`}</h2>
                  <p>
                    The delivery method will not be valid after deletion, this
                    action cannot be undone
                  </p>
                </hgroup>
              </div>
            </Modal>
          </>
        );
      }}
    </DeleteModal>
  );
}
