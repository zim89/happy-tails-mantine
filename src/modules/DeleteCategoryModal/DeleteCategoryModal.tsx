'use client';

import { UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

import styles from './DeleteCategoryModal.module.css';

import { useRemoveCategoryMutation } from '@/shared/api/categoryApi';
import DeleteModal from '@/components/DeleteModal';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { Category } from '@/shared/types/types';
import { useContext } from 'react';
import { notifyContext } from '@/shared/context/notification.context';

type Props = {
  categoryLine: Category;
};
export default function DeleteCategoryModal({ categoryLine }: Props) {
  const [dispatch] = useRemoveCategoryMutation();
  const { setNotification } = useContext(notifyContext);

  const handleDelete = async () => {
    try {
      if (categoryLine.productCount > 0) {
        closeMain();
        openError();
      } else {
        debugger;
        await dispatch({ id: categoryLine.id }).unwrap();

        closeMain();
        setNotification('Success', 'Category successfully deleted!');
      }
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
  const [openedError, { open: openError, close: closeError }] =
    useDisclosure(false);

  return (
    <DeleteModal>
      {(Modal) => {
        return (
          <>
            {/* Button to open main modal */}
            <UnstyledButton className={styles.actionButton} onClick={openMain}>
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
                containerStyles: { display: 'flex', justifyContent: 'end' },
              }}
            >
              <div className={styles.message}>
                <Image
                  src='/icons/file_attention.svg'
                  alt=''
                  width={64}
                  height={64}
                />
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
                <Image
                  src='/icons/categories/file_error.svg'
                  alt=''
                  width={64}
                  height={64}
                />
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
          </>
        );
      }}
    </DeleteModal>
  );
}
