import { useContext } from 'react';
import { UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit2 } from 'lucide-react';
import Image from 'next/image';

import ModalFooter from '@/components/ModalFooter';
import { notifyContext } from '@/shared/context/notification.context';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';

import classes from './classes.module.css';
import ModalWindow from '@/components/ModalWindow';
import { ShippingMethod } from '@/shared/types/shippingMethod.types';
import { useUpdateShippingMethodMutation } from '@/shared/api/shippingMethodsApi';

type Props = {
  shippingMethod: ShippingMethod;
  visible: boolean;
};

export default function UpdateShippingMethodModal({
  shippingMethod,
  visible,
}: Props) {
  const { setNotification } = useContext(notifyContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [dispatch] = useUpdateShippingMethodMutation();

  if (!visible) return;

  const handleSubmit = async () => {
    try {
      await dispatch(shippingMethod).unwrap();

      close();
      setNotification('Success', 'Changes saved!');
    } catch (err) {
      close();
      if (isAxiosQueryError(err)) {
        setNotification(
          'Failed',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      }
      console.error(err);
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
