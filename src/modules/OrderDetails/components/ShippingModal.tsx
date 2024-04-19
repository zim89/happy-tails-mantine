import { Button, Modal, Radio, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit2 } from 'lucide-react';

import styles from '@/modules/AddProductModal/AddProductModal.module.css';
import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { Form, useForm } from '@mantine/form';
import { Order } from '@/shared/types/types';
import { dirtyFields } from '@/shared/lib/helpers';
import { cn } from '@/shared/lib/utils';

type Props = {
  order: Order;
};

export const ShippingModal = ({ order }: Props) => {
  const [isOpened, { open, close }] = useDisclosure();
  const form = useForm({
    initialValues: {
      billingAddress: order.shippingAddress,
      shippingAddress: order.shippingAddress,
      shippingMethod: order.shippingMethod,
    },
  });

  return (
    <>
      <Button
        classNames={{
          root: 'border-[1px] border-[#C8C8C8] w-[36px] h-[36px] p-0',
        }}
        onClick={open}
      >
        <Edit2 size={16} color='black' />
      </Button>

      <Modal
        size={765}
        opened={isOpened}
        onClose={close}
        classNames={{
          header: styles.modalHeader,
          content: styles.modalContent,
        }}
      >
        <ModalHeader heading='Edit Order Details' handleClose={close} />
        {/* Modal Content */}

        <Form form={form}>
          <TextInput
            label='Billing Address'
            type='text'
            classNames={{
              root: 'form-root',
              label: 'form-label',
              input: cn(
                'form-input',
                form?.errors?.billingAddress && 'form-error--input'
              ),
              error: 'form-error',
            }}
            {...form.getInputProps('billingAddress')}
            placeholder='Enter an updated billing address'
          />

          <TextInput
            label='Shipping Address'
            type='text'
            classNames={{
              root: 'form-root',
              label: 'form-label',
              input: cn(
                'form-input',
                form?.errors?.billingAddress && 'form-error--input'
              ),
              error: 'form-error',
            }}
            {...form.getInputProps('shippingAddress')}
            placeholder='Enter an updated shipping address'
          />

          <Radio.Group {...form.getInputProps('shippingMethod')} label="Shipment Method">
            <Radio color='white' iconColor="black" classNames={{ radio: "border-[1px] border-black", }} value="Standard" label="Standard Shipping" />
            <Radio color='white' iconColor='black' value="Express" label="Fast Shipping" />
          </Radio.Group>
        </Form>

        {/* Modal Content */}
        <ModalFooter
          singleBtn={false}
          secondaryBtnText='Cancel'
          secondaryBtnOnClick={close}
          primaryBtnText='Save'
          primaryBtnOnClick={form.onSubmit((values) => {
            const [updatedShipping, count] = dirtyFields(values);
            // If there is no changes, omit the call to API
            if (count === 0) return;

            console.log(updatedShipping);
          })}
        />
      </Modal>
    </>
  );
};
