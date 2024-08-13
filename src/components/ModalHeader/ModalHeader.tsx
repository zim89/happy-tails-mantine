import { X } from 'lucide-react';

import styles from './ModalHeader.module.css';

export type Props = {
  heading: string;
  handleClose: () => void;
};
export default function ModalHeader({ heading, handleClose }: Props) {
  return (
    <>
      <span
        data-testid='close-button'
        className='absolute right-4 top-6 cursor-pointer'
        onClick={handleClose}
      >
        <X />
      </span>
      <div className={styles.header}>
        <h2 data-testid='modal-heading'>{heading}</h2>
      </div>

      {/* Divider */}
      <div className={styles.divider} />
    </>
  );
}
