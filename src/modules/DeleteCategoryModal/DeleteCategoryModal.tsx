import { use, useState } from 'react';
import { Button } from '@mantine/core';
import { Check, CheckCircle } from 'lucide-react';
import Image from 'next/image';

import styles from './DeleteCategoryModal.module.css';
import { useDisclosure } from '@mantine/hooks';
import Modal from '@/components/ModalWindow';
import Notify from '@/components/Notify';
import { Category } from '../CategoriesTable/lib/data';
import { categoriesContext } from '../CategoriesTable/lib/utils';

import file_attention from '@/assets/icons/categories/file_attention.svg';
import file_error from '@/assets/icons/categories/file_error.svg';
import check_circle from '@/assets/icons/additional/check-circle.svg';
import ModalFooter from '@/components/ModalFooter';

type Props = {
  categoryLine: Category;
};
export default ({ categoryLine }: Props) => {
  const { setCategories } = use(categoriesContext);

  const [isNotified, setIsNotified] = useState(false);

  const handleDelete = () => {
    if (categoryLine.itemsCount > 0) {
      closeMain();
      openError();
    } else {
      setCategories((prev) => prev.filter((c) => c.id !== categoryLine.id));
      closeMain();
      setIsNotified(true);
    }
  };

  const handleClose = () => {
    setIsNotified(false);
  };

  const [openedMain, { open: openMain, close: closeMain }] =
    useDisclosure(false);
  const [openedError, { open: openError, close: closeError }] =
    useDisclosure(false);

  return (
    <>
      <Button className={styles.actionButton} onClick={openMain}>
        Delete
      </Button>

      <Modal
        size={600}
        opened={openedMain}
        classNames={{
          header: 'hidden',
          content: 'p-10',
          body: 'p-0',
        }}
        onClose={closeMain}
      >
        <>
          <div className={styles.message}>
            <Image src={file_attention.src} alt='' width={64} height={64} />
            <hgroup>
              <h2>Delete "{categoryLine.name}" category?</h2>
              <p>
                This action cannot be undone. Please confirm that you want to
                proceed.
              </p>
            </hgroup>
          </div>

          <ModalFooter
            singleBtn={false}
            secondaryBtnOnClick={closeMain}
            secondaryBtnText='Cancel'
            primaryBtnOnClick={handleDelete}
            primaryBtnText='Delete'
            containerStyles={{ display: 'flex', justifyContent: 'end' }}
          />
        </>
      </Modal>

      <Modal
        size={600}
        opened={openedError}
        classNames={{
          header: 'hidden',
          content: 'p-10',
          body: 'p-0',
        }}
        onClose={closeError}
      >
        <div className={styles.message}>
          <Image src={file_error.src} alt='' width={64} height={64} />
          <hgroup>
            <h2>Delete "{categoryLine.name}" Unavailable</h2>
            <p>
              This category cannot be deleted because it contains associated
              products. To delete the category, please remove or reassign the
              products associated with it.
            </p>
          </hgroup>
        </div>

        <ModalFooter
          singleBtn
          primaryBtnOnClick={closeError}
          primaryBtnText='OK'
          containerStyles={{ display: 'flex', justifyContent: 'end' }}
        />
      </Modal>

      <Notify
        icon={
          <Image
            src={check_circle.src}
            alt=''
            width={24}
            height={24}
            className='h-6 w-6'
          />
        }
        color='#389B48'
        visible={isNotified}
        onClose={handleClose}
        className=''
        text='Category successfully deleted!'
      />
    </>
  );
};