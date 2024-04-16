import { Modal, ModalProps } from '@mantine/core';

export type Props = {
  children: React.ReactNode;
} & ModalProps;
export default function ModalWindow({ children, ...rest }: Props) {
  return (
    <>
      <Modal centered {...rest}>
        {children}
      </Modal>
    </>
  );
}