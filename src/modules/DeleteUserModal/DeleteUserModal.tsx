'use client';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

import DeleteModal from '@/components/DeleteModal';
import file_attention from '@/assets/icons/categories/file_attention.svg';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { User } from '@/shared/types/auth.types';
import { useDeleteUserMutation } from '@/shared/api/usersApi';

type Props = {
  user: User;
  setNotification: (type: "Success" | "Failed", text?: string) => void;
};

export default function DeleteUserModal({ user, setNotification }: Props) { 
  const [dispatch] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await dispatch({ userId: user.userId }).unwrap();
      closeMain();
      setNotification('Success');
    } catch (err) {
      closeMain();
      if (isAxiosQueryError(err)) {
        setNotification('Failed', isErrorDataString(err.data) ? err.data : err.data.message);
      }
      console.error(err);
    }
  };

  const [openedMain, { open: openMain, close: closeMain }] =
    useDisclosure(false);

  return (
    <DeleteModal>
      {(Modal) => (
        <>
          {/* Opens a modal window */}
          <span onClick={openMain} className='block p-0 text-black'>
            Delete
          </span>

          <Modal
            onClose={closeMain}
            opened={openedMain}
            footerProps={{
              singleBtn: false,
              secondaryBtnOnClick: closeMain,
              secondaryBtnText: 'Cancel',
              primaryBtnOnClick: handleDelete,
              primaryBtnText: 'Delete',
              containerStyles: { display: 'flex', justifyContent: 'end', marginTop: "32px" },
            }}
          >
            <div className="flex items-center gap-3">
              <Image
                src={file_attention.src}
                alt={user.userId}
                width={64}
                height={64}
              />
              <hgroup>
                <h2 className="mb-3 font-bold">{`Delete user #${user.userId}?`}</h2>
                <p>Are you sure you want to delete the selected user?</p>
              </hgroup>
            </div>
          </Modal>
        </>
      )}
    </DeleteModal>
  );
}
