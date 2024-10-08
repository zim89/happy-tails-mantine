'use client';

import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

import DeleteModal from '@/components/DeleteModal';
import { Product } from '@/shared/types/types';
import { useRemoveMutation } from '@/shared/api/productApi';
import {
  brandNotification,
  isAxiosQueryError,
  isErrorDataString,
} from '@/shared/lib/helpers';

type Props = {
  productLine: Product;
};

export default function DeleteProductModal({ productLine }: Props) {
  const [dispatch] = useRemoveMutation();

  const handleDelete = async () => {
    try {
      await dispatch({ id: productLine.id }).unwrap();
      closeMain();
      brandNotification('SUCCESS', 'Product deleted successfully');
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
                alt={productLine.name}
                width={64}
                height={64}
              />
              <hgroup>
                <h2 className='mb-3 font-bold'>{`Delete "${productLine.name}"?`}</h2>
                <p>Are you sure you want to delete the selected product?</p>
              </hgroup>
            </div>
          </Modal>
        </>
      )}
    </DeleteModal>
  );
}
