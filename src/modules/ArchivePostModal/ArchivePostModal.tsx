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
import { useChangePostStatusMutation } from '@/shared/api/postApi';
import { handleError } from '@/shared/helpers/error.helpers';
import { toast } from 'react-toastify';

type Props = {
  id: number;
  customHandler?: (openHandler: () => void) => React.ReactNode;
  redirect?: string;
};

export default function ArchivePostModal({
  id,
  customHandler,
  redirect,
}: Props) {
  const [dispatch] = useChangePostStatusMutation();
  const router = useRouter();

  const handleArchive = async () => {
    try {
      await dispatch({ id, status: 'ARCHIVED' }).unwrap();

      closeMain();
      brandNotification('SUCCESS', 'Post archived successfully!');
      redirect && router.replace(redirect);
    } catch (err) {
      closeMain();
      handleError(err, toast.error);
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
              Archive
            </span>
          )}

          <Modal
            onClose={closeMain}
            opened={openedMain}
            footerProps={{
              singleBtn: false,
              secondaryBtnOnClick: closeMain,
              secondaryBtnText: 'Cancel',
              primaryBtnOnClick: handleArchive,
              primaryBtnText: 'Archive',
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
                <h2 className='mb-3 font-bold'>{`Archive article #${id}?`}</h2>
                <p>Are you sure you want to archived the selected article?</p>
              </hgroup>
            </div>
          </Modal>
        </>
      )}
    </DeleteModal>
  );
}
