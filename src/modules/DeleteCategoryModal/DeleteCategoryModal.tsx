'use client';
import { useState } from 'react';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { Check, AlertTriangle } from 'lucide-react';

import type { NotifyProps } from '@/components/Notify';
import styles from './DeleteCategoryModal.module.css';
import { Category } from '@/shared/api/categoryApi';

import file_attention from '@/assets/icons/categories/file_attention.svg';
import file_error from '@/assets/icons/categories/file_error.svg';

import { useRemoveCategoryMutation } from '@/shared/api/categoryApi';
import { useAuth } from '@/shared/hooks/useAuth';
import DeleteModal from '@/components/DeleteModal';

type Props = {
  categoryLine: Category;
};
export default function DeleteCategoryModal({ categoryLine }: Props) {
  const { access_token } = useAuth();
  const [dispatch] = useRemoveCategoryMutation();
  const [notificationType, setNotificationType] = useState('');

  const handleDelete = async () => {
    try {
      if (categoryLine.productCount > 0) {
        closeMain();
        openError();
      } else {
        await dispatch({ id: categoryLine.id, access_token });

        closeMain();
        setNotificationType('Success');
      }
    } catch (err) {
      setNotificationType('Failed');
      console.error(err);
    }
  };

  const closeNotification = () => {
    setNotificationType('');
  };

  const [openedMain, { open: openMain, close: closeMain }] =
    useDisclosure(false);
  const [openedError, { open: openError, close: closeError }] =
    useDisclosure(false);

  const notifyProps: Omit<NotifyProps, 'onClose'> | null =
    notificationType === 'Success'
      ? {
          kind: 'success',
          text: 'Category successfully deleted!',
          icon: <Check size={15} />,
          visible: true,
          color: '#389B48',
        }
      : notificationType === 'Failed'
        ? {
            kind: 'fail',
            text: 'Category deletion failed!',
            visible: true,
            color: 'transparent',
            icon: <AlertTriangle size={20} fill='#DC362E' />,
          }
        : null;

  return (
    <DeleteModal>
      {(Modal, Notification) => {
        return (
          <>
            {/* Button to open main modal */}
            <Button className={styles.actionButton} onClick={openMain}>
              Delete
            </Button>

            <Modal
              onClose={closeMain}
              opened={openedMain}
              footerProps={{
                singleBtn: false,
                secondaryBtnOnClick: closeMain,
                secondaryBtnText: 'Cancel',
                primaryBtnOnClick: handleDelete,
                primaryBtnText: 'Delete',
                containerStyles: { display: 'flex', justifyContent: 'end' },
              }}
            >
              <div className={styles.message}>
                <Image src={file_attention.src} alt='' width={64} height={64} />
                <hgroup>
                  <h2>{`Delete "${categoryLine.name}" category?`}</h2>
                  <p>
                    This action cannot be undone. Please confirm that you want
                    to proceed.
                  </p>
                </hgroup>
              </div>
            </Modal>

            <Modal
              opened={openedError}
              onClose={closeError}
              footerProps={{
                singleBtn: true,
                primaryBtnOnClick: closeError,
                primaryBtnText: 'OK',
                containerStyles: { display: 'flex', justifyContent: 'end' },
              }}
            >
              <div className={styles.message}>
                <Image src={file_error.src} alt='' width={64} height={64} />
                <hgroup>
                  <h2>{`Delete "${categoryLine.name}" Unavailable`}</h2>
                  <p>
                    This category cannot be deleted because it contains
                    associated products. To delete the category, please remove
                    or reassign the products associated with it.
                  </p>
                </hgroup>
              </div>
            </Modal>

            {notifyProps && (
              <Notification {...notifyProps} onClose={closeNotification} />
            )}
          </>
        );
      }}
    </DeleteModal>
  );
}
