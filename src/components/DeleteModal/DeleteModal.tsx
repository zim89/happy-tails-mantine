import React, { useMemo } from 'react';

import Modal, {
  Props as ModalProps,
} from '@/components/ModalWindow/ModalWindow';
import ModalFooter, { Props as FooterProps } from '@/components/ModalFooter';

type ModalContentProps = {
  children: React.ReactNode;
  footerProps: FooterProps;
} & ModalProps;

export type Props = {
  children(
    Modal: (props: ModalContentProps) => React.ReactNode
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

  return <>{children(useMemo(() => modalContent, []))}</>;
}
