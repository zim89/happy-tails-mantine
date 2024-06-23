'use client';

import { useDisclosure } from '@mantine/hooks';
import Link, { LinkProps } from 'next/link';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import WarnModal from '@/components/DeleteModal';
import { UnsavedChangesContext } from '@/shared/lib/context';

import file_attention from '@/assets/icons/categories/file_attention.svg';

// If it's used outside UnsavedChangesContextProvider, it serves as a typical <Link/>

type Props = LinkProps & {
  className?: string;
  children: React.ReactNode;
};
export default function BlockLink({ children, ...props }: Props) {
  const router = useRouter();
  const context = useContext(UnsavedChangesContext);
  const [openedMain, { open: openMain, close: closeMain }] =
    useDisclosure(false);

  const link = <Link {...props}>{children}</Link>;

  return (
    <>
      {!context ? (
        link
      ) : context.unsavedChanges ? (
        <WarnModal>
          {(Modal) => (
            <>
              {/* Opens a modal window */}
              <span onClick={openMain} {...props}>
                {children}
              </span>

              <Modal
                onClose={closeMain}
                opened={openedMain}
                size={380}
                footerProps={{
                  singleBtn: false,
                  secondaryBtnText: 'Leave',
                  secondaryBtnOnClick: () => {
                    closeMain();
                    context.update((prev) => ({
                      ...prev,
                      unsavedChanges: false,
                    }));
                    router.replace(props.href.toString());
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
                    <h2 className='mb-3 font-bold'>
                      You have unsaved changes!
                    </h2>
                    <p className='text-sm text-brand-grey-600'>
                      Are you sure you want to leave?
                    </p>
                  </hgroup>
                </div>
              </Modal>
            </>
          )}
        </WarnModal>
      ) : (
        link
      )}
    </>
  );
}
