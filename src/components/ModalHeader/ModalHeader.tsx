import { X } from "lucide-react";

import styles from "./ModalHeader.module.css";

type Props = {
  heading: string;
  handleClose: () => void
}
export default ({ heading, handleClose }: Props) => {
  return (
    <>
      <span className='absolute right-4 top-6 cursor-pointer' onClick={handleClose}>
        <X />
      </span>
      <div className={styles.header}>
        <h2>{heading}</h2>
      </div>

      {/* Divider */}
      <div className={styles.divider} />
    </>
  );
};
