import { Mail, Trash2 } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';

import DeleteModal from '@/components/DeleteModal';
import { brandNotification, handleDispatchError } from '@/shared/lib/helpers';
import { useBulkRemoveMutation } from '@/shared/api/feedbackApi';

import styles from './DeleteMessagesModal.module.css';

type Props = {
  messages: number[];
  setSelected?: (value: number[]) => void;
};

export default function DeleteMessagesModal({ messages, setSelected }: Props) {
  const [remove] = useBulkRemoveMutation();
  const [openedMain, { open: openMain, close: closeMain }] =
    useDisclosure(false);

  const handleDelete = async () => {
    try {
      brandNotification(
        'SUCCESS',
        `${messages.length === 1 ? 'Feedback' : 'Feedbacks'} successfully deleted!`
      );

      if (setSelected) setSelected([]);
      closeMain();
      await remove(messages).unwrap();
    } catch (err) {
      closeMain();
      handleDispatchError(err);
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
