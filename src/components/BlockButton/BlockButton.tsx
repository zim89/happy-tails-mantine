import { UnstyledButton, UnstyledButtonProps } from '@mantine/core';
import { useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

import WarnModal from '@/components/DeleteModal';

import { UnsavedChangesContext } from '@/shared/context/unsaved.context';

export type Props = UnstyledButtonProps & {
  onClick: () => void;
  children: React.ReactNode;
};

export default function BlockButton({ onClick, children, ...props }: Props) {
  const context = useContext(UnsavedChangesContext);
  const [openedMain, { open: openMain, close: closeMain }] =
    useDisclosure(false);

  return (
    <>
      <UnstyledButton
        role='button'
        className='rounded-md bg-red-500 p-2 text-white hover:bg-red-600'
        onClick={context && context.unsavedChanges ? openMain : onClick}
        {...props}
      >
        {children}
      </UnstyledButton>
      <WarnModal>
        {(Modal) => (
          <>
            <Modal
              className='rounded-md bg-white p-4 shadow-md'
              role='dialog'
              onClose={closeMain}
              opened={openedMain}
              size={380}
              footerProps={{
                singleBtn: false,
                secondaryBtnText: 'Proceed',
                secondaryBtnOnClick: () => {
                  closeMain();
                  context.update((prev) => ({
                    ...prev,
                    unsavedChanges: false,
                  }));
                  onClick();
                },
                primaryBtnOnClick: closeMain,
                primaryBtnText: 'Stay',
                containerStyles: {
                  display: 'flex',
                  justifyContent: 'end',
                  marginTop: '24px',
                },
              }}
            >
              <div
                className='flex items-center gap-3'
                data-testid='modal-content'
              >
                <Image
                  src='/icons/file_attention.svg'
                  alt={"Attention, your changes aren't saved!"}
                  width={64}
                  height={64}
                />
                <hgroup>
                  <h2 className='mb-3 font-bold'>You have unsaved changes!</h2>
                  <p className='text-sm text-brand-grey-600'>
                    Are you sure you want to proceed?
                  </p>
                </hgroup>
              </div>
            </Modal>
          </>
        )}
      </WarnModal>
    </>
  );
}
