'use client';

import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import DeleteModal from '@/components/DeleteModal';
import {
  brandNotification,
  isAxiosQueryError,
  isErrorDataString,
} from '@/shared/lib/helpers';
import { useDeletePostMutation } from '@/shared/api/postApi';

type Props = {
  id: number;
  customHandler?: (openHandler: () => void) => React.ReactNode;
  redirect?: string;
};

export default function DeletePostModal({
  id,
  customHandler,
  redirect,
}: Props) {
  const [dispatch] = useDeletePostMutation();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      closeMain();
      brandNotification('SUCCESS', 'Article successfully deleted!');

      await dispatch({ id }).unwrap();
      redirect && router.replace(redirect);
    } catch (err) {
      closeMain();
      if (isAxiosQueryError(err)) {
        brandNotification(
          'ERROR',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
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
          {customHandler ? (
            customHandler(openMain)
          ) : (
            <span onClick={openMain} className='block p-0 text-secondary'>
              Delete
            </span>
          )}

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
                marginTop: '32px',
              },
            }}
          >
            <div className='flex items-center gap-3'>
              <Image
                src='/icons/file_attention.svg'
                alt={''}
                width={64}
                height={64}
              />
              <hgroup>
                <h2 className='mb-3 font-bold'>{`Delete article #${id}?`}</h2>
                <p>Are you sure you want to delete the selected article?</p>
              </hgroup>
            </div>
          </Modal>
        </>
      )}
    </DeleteModal>
  );
}
