import { Mail, Trash2 } from 'lucide-react';

import DeleteModal from '@/components/DeleteModal';
import { useDisclosure } from '@mantine/hooks';

import styles from './DeleteMessagesModal.module.css';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { useBulkRemoveMutation } from '@/shared/api/feedbackApi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { LoadingOverlay } from '@mantine/core';

type Props = {
  messages: number[];
  setSelected?: (value: number[]) => void;
};

export default function DeleteMessagesModal({ messages, setSelected }: Props) {
  const [remove] = useBulkRemoveMutation();
  const [loading, setLoading] = useState(false);
  const [openedMain, { open: openMain, close: closeMain }] =
    useDisclosure(false);

  const handleDelete = async () => {
    try {
      await remove(messages).unwrap();
      toast.success(
        `${messages.length === 1 ? 'Feedback' : 'Feedbacks'} successfully deleted!`
      );
      if (setSelected) setSelected([]);
    } catch (err) {
      if (isAxiosQueryError(err)) {
        toast.error(isErrorDataString(err.data) ? err.data : err.data.message);
      }
    } finally {
      closeMain();
    }
  };

  return (
    <DeleteModal>
      {(Modal) => {
        return (
          <>
            {/* Button to open main modal */}
            <span
              className='flex cursor-pointer items-center gap-2 text-sm'
              onClick={openMain}
            >
              <Trash2 size={16} />
              Delete
            </span>

            <Modal
              keepMounted
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
              <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{
                  radius: 'sm',
                  blur: 2,
                }}
                loaderProps={{ color: '#161616' }}
              />
              <div className={styles.message}>
                <Mail size={64} />
                <hgroup>
                  {messages.length === 1 ? (
                    <h2>Delete the message?</h2>
                  ) : (
                    <h2>{`Delete ${messages.length} messages?`}</h2>
                  )}

                  <p>
                    This action cannot be undone. Please confirm that you want
                    to proceed.
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
