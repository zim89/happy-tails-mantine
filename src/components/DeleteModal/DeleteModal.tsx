import Image from 'next/image';
import React, { useMemo } from 'react';

import Modal, { Props as ModalProps } from '@/components/ModalWindow';
import Notify, { NotifyProps } from '@/components/Notify';

import check_circle from '@/assets/icons/additional/check-circle.svg';
import ModalFooter, { Props as FooterProps } from '@/components/ModalFooter';

type ModalContentProps = {
  children: React.ReactNode;
  footerProps: FooterProps;
} & ModalProps;

type Props = {
  children(
    Modal: (props: ModalContentProps) => React.ReactNode,
    Notify: (props: NotifyProps) => React.ReactNode
  ): React.ReactNode;
};
export default function DeleteModal({ children }: Props) {
  const modalContent = ({
    footerProps,
    children,
    ...props
  }: ModalContentProps) => (
    <>
      <Modal
        size={600}
        {...props}
        classNames={{
          header: 'hidden',
          content: 'p-10',
          body: 'p-0',
        }}
      >
        <>
          {children}
          <ModalFooter {...footerProps} />
        </>
      </Modal>
    </>
  );

  const notification = (props: NotifyProps) => (
    <Notify
      icon={
        <Image
          src={check_circle.src}
          alt='Notification'
          width={24}
          height={24}
          className='h-6 w-6'
        />
      }
      color='transparent'
      {...props}
    />
  );

  return (
    <>
      {children(
        useMemo(() => modalContent, []),
        useMemo(() => notification, [])
      )}
    </>
  );
}
