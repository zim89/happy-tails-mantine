'use client';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { Check, AlertTriangle } from 'lucide-react';

import styles from './DeleteCategoryModal.module.css';

import file_attention from '@/assets/icons/categories/file_attention.svg';
import file_error from '@/assets/icons/categories/file_error.svg';

import { useRemoveCategoryMutation } from '@/shared/api/categoryApi';
import DeleteModal from '@/components/DeleteModal';
import { useNotification } from '@/shared/hooks/useNotification';
import { isAxiosQueryError, isErrorDataString, mockLongRequest } from '@/shared/lib/helpers';
import { Category } from '@/shared/types/types';

type Props = {
  categoryLine: Category;
};
export default function DeleteCategoryModal({ categoryLine }: Props) {
  const [dispatch] = useRemoveCategoryMutation();
  const [setNotification, { props, clear }] = useNotification({
    failed: {
      text: 'Category deletion failed!',
      color: 'transparent',
      icon: <AlertTriangle size={24} fill='#DC362E' />,
    },
    success: {
      text: 'Category successfully deleted!',
      icon: <Check size={24} />,
      color: '#389B48',
    }
  })

  const handleDelete = async () => {
    try {
      if (categoryLine.productCount > 0) {
        closeMain();
        openError();
      } else {
        await dispatch({ id: categoryLine.id }).unwrap();

        closeMain();
        setNotification('Success');
      }
    } catch (err) {
      closeMain();
      if (isAxiosQueryError(err)) {
        setNotification('Failed', isErrorDataString(err.data) ? err.data : err.data.message);
      }
      console.error(err);
    }
  };

  const closeNotification = () => {
    clear();
  };

  const [openedMain, { open: openMain, close: closeMain }] =
    useDisclosure(false);
  const [openedError, { open: openError, close: closeError }] =
    useDisclosure(false);

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

            <Notification {...props} onClose={closeNotification} />
          </>
        );
      }}
    </DeleteModal>
  );
}
