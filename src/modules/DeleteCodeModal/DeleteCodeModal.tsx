'use client';

import { UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { useContext } from 'react';

import classes from './classes.module.css';

import DeleteModal from '@/components/DeleteModal';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { notifyContext } from '@/shared/context/notification.context';
import {
  Discount,
  useDeleteDiscountCodeMutation,
} from '@/shared/api/discountApi';

type Props = {
  promoCode: Discount;
};
export default function DeleteCodeModal({ promoCode }: Props) {
  const [dispatch] = useDeleteDiscountCodeMutation();
  const { setNotification } = useContext(notifyContext);

  const handleDelete = async () => {
    try {
      await dispatch({ id: promoCode.id }).unwrap();

      closeMain();
      setNotification('Success', 'Promo code successfully deleted!');
    } catch (err) {
      closeMain();
      if (isAxiosQueryError(err)) {
        setNotification(
          'Failed',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      }
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
            <UnstyledButton className={classes.actionButton} onClick={openMain}>
              Delete
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
                  alt=''
                  width={64}
                  height={64}
                />
                <hgroup>
                  <h2>{`Delete ${promoCode.code} Promo code?`}</h2>
                  <p>
                    The promo code will not be valid after deletion, this action
                    cannot be undone
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
