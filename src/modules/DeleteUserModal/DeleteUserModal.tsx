'use client';

import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

import DeleteModal from '@/components/DeleteModal';
import { brandNotification, handleDispatchError } from '@/shared/lib/helpers';
import { User } from '@/shared/types/auth.types';
import { useDeleteUserMutation } from '@/shared/api/usersApi';

type Props = {
  user: User;
};

export default function DeleteUserModal({ user }: Props) {
  const [dispatch] = useDeleteUserMutation();

  const [openedMain, { open, close }] = useDisclosure(false);

  const handleDelete = async () => {
    try {
      close();
      brandNotification('SUCCESS', 'User deleted successfully!');

      await dispatch({ userId: user.userId }).unwrap();
    } catch (err) {
      close();
      handleDispatchError(err);
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
            opened={openedMain}
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
                alt={user.userId}
                width={64}
                height={64}
              />
              <hgroup>
                <h2 className='mb-3 font-bold'>{`Delete user #${user.userId}?`}</h2>
                <p>Are you sure you want to delete the selected user?</p>
              </hgroup>
            </div>
          </Modal>
        </>
      )}
    </DeleteModal>
  );
}
