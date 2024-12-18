import { UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit2 } from 'lucide-react';
import Image from 'next/image';

import ModalFooter from '@/components/ModalFooter';
import { brandNotification, handleDispatchError } from '@/shared/lib/helpers';

import classes from './classes.module.css';
import ModalWindow from '@/components/ModalWindow/ModalWindow';
import { ShippingMethod } from '@/shared/types/shippingMethod.types';
import { useUpdateShippingMethodMutation } from '@/shared/api/shippingMethodsApi';
import { handleError } from '@/shared/helpers/error.helpers';
import { toast } from 'react-toastify';

type Props = {
  shippingMethod: ShippingMethod;
  visible: boolean;
};

export default function UpdateShippingMethodModal({
  shippingMethod,
  visible,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [dispatch] = useUpdateShippingMethodMutation();

  if (!visible) return;

  const handleSubmit = async () => {
    try {
      close();
      brandNotification('SUCCESS', 'Changes saved!');
      await dispatch(shippingMethod).unwrap();
    } catch (err) {
      close();
      handleError(err, toast.error);
    }
  };
  return (
    <>
      <UnstyledButton
        style={{
          border: '1px solid #C8C8C8',
        }}
        className='rounded-sm bg-white p-[10px] hover:bg-brand-grey-100'
        onClick={open}
      >
        <Edit2 size={16} strokeWidth={3} />
      </UnstyledButton>

      <ModalWindow
        size={694}
        opened={opened}
        classNames={{
          header: classes.modalHeader,
          content: classes.modalContent,
        }}
        onClose={close}
      >
        <div className={classes.message}>
          <Image
            src='/icons/file_attention.svg'
            width={64}
            height={64}
            alt=''
          />
          <hgroup>
            <h2>Do you want to save these changes?</h2>
            <p>
              Existing orders might be affected. You have to confirm changes to
              delivery options.
            </p>
          </hgroup>
        </div>

        <ModalFooter
          singleBtn={false}
          secondaryBtnOnClick={() => close()}
          secondaryBtnText='Cancel'
          primaryBtnText='Save changes'
          primaryBtnClassName='p-[10px] px-10 bg-secondary text-primary rounded-sm font-bold cursor-pointer'
          primaryBtnOnClick={() => handleSubmit()}
        />
      </ModalWindow>
    </>
  );
}
