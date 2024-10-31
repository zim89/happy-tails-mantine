import { UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useContext } from 'react';

import ModalFooter from '@/components/ModalFooter';
import Modal from '@/components/ModalWindow';
import { context } from '../AddProduct/lib/utils';

export const AddVariantModal = () => {
  const { variants, setVariants } = useContext(context);
  const [opened, { close, open }] = useDisclosure(false);

  const handleSubmit = () => {
    setVariants((prev) => prev.concat(null));
    close();
  };

  return (
    <>
      <UnstyledButton classNames={{ root: 'flex gap-2 items-center' }}>
        <PlusCircle size={20} color='black' />
        <span className='text-sm font-bold' onClick={open}>
          {variants.length >= 1
            ? 'Add another option'
            : 'Add options like size or color'}
        </span>
      </UnstyledButton>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <div className='modal-heading gap-6 p-2'>
          <Image
            src='/images/version-control.png'
            alt=''
            width={64}
            height={64}
          />
          <hgroup>
            <h3 className='text-2xl font-semibold'>
              Add an option for the product?
            </h3>
            <p className='mt-2 text-sm text-brand-grey-500'>
              Click OK to proceed
            </p>
          </hgroup>
        </div>

        <ModalFooter
          primaryBtnText='OK'
          secondaryBtnText='Cancel'
          primaryBtnClassName='flex-1 py-2 cursor-pointer text-center bg-secondary text-primary rounded-sm'
          secondaryBtnClassName='flex-1 py-2 cursor-pointer text-center border-brand-grey-300 border'
          primaryBtnOnClick={() => handleSubmit()}
          secondaryBtnOnClick={close}
          singleBtn={false}
          containerStyles={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 24,
            gap: 24,
            padding: 4,
          }}
        />
      </Modal>
    </>
  );
};
