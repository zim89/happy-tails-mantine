import { UnstyledButton, UnstyledButtonProps } from '@mantine/core';
import { useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

import WarnModal from '@/components/DeleteModal';

import file_attention from '@/assets/icons/categories/file_attention.svg';
import { UnsavedChangesContext } from '@/shared/context/unsaved.context';

type Props = UnstyledButtonProps & {
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
        onClick={context && context.unsavedChanges ? openMain : onClick}
        {...props}
      >
        {children}
      </UnstyledButton>
      <WarnModal>
        {(Modal) => (
          <>
            <Modal
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
              <div className='flex items-center gap-3'>
                <Image
                  src={file_attention.src}
                  alt={"Attention, your changes aren't saved!"}
                  width={64}
                  height={64}
                />
                <hgroup>
                  <h2 className='mb-3 font-bold'>You have unsaved changes!</h2>
                  <p className='text-sm text-[#A0A0A0]'>
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
