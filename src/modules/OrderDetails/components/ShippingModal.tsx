import { Button, Modal, Radio, TextInput, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit2, Dot, Check, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

import styles from '@/modules/AddProductModal/AddProductModal.module.css';
import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { Form, useForm } from '@mantine/form';
import { Order } from '@/shared/types/types';
import { cn } from '@/shared/lib/utils';
import Checkbox from '@/components/Checkbox';
import Notify from '@/components/Notify';
import { useNotification } from '@/shared/hooks/useNotification';
import { useUpdateOrderMutation } from '@/shared/api/ordersApi';

type Props = {
  order: Order;
};
export const ShippingModal = ({ order }: Props) => {
  const [isOpened, { open, close }] = useDisclosure();
  const [dispatch] = useUpdateOrderMutation();
  const [setNotification, { props, clear }] = useNotification({
    failed: {
      color: 'transparent',
      icon: <AlertTriangle size={24} fill='#DC362E' />,
      text: 'Delivery options update failed. Please try again later.',
    },
    success: {
      color: '#389B48',
      icon: <Check size={24} />,
      text: 'Changes saved!',
    },
  });

  const form = useForm({
    initialValues: {
      billingAddress: {
        country: order.billingAddress.country,
        city: order.billingAddress.city,
        addressLine1: order.billingAddress.addressLine1,
        addressLine2: order.billingAddress.addressLine2,
        state: order.billingAddress.state,
        zip: order.billingAddress.zip,
        phone: order.billingAddress.phoneNumber,
        company: order.billingAddress.company,
        sameAsDelivery: false,
      },
      shippingAddress: {
        country: order.shippingAddress.country,
        city: order.shippingAddress.city,
        addressLine1: order.shippingAddress.addressLine1,
        addressLine2: order.shippingAddress.addressLine2,
        state: order.shippingAddress.state,
        zip: order.shippingAddress.zip,
        phone: order.shippingAddress.phoneNumber,
        company: order.shippingAddress.company,
      },
      shippingMethod: order.shippingMethodDTO.name,
    },
  });

  const handleUpdate = async (values: typeof form.values) => {
    try {
      let request = {
        orderNumber: order.number,
        billingAddress: JSON.stringify(values.billingAddress),
        shippingAddress: JSON.stringify(values.shippingAddress),
        shippingMethod: values.shippingMethod,
      };
      await dispatch(request);
      close();
      setNotification('Success');
    } catch (err) {
      console.error(err);
      close();
      setNotification('Failed');
    }
  };

  useEffect(() => {
    form.values.billingAddress.sameAsDelivery
      ? form.setFieldValue('billingAddress', {
          ...form.values.shippingAddress,
          sameAsDelivery: form.values.billingAddress.sameAsDelivery,
        })
      : form.setFieldValue('billingAddress', {
          ...form.values.billingAddress,
          sameAsDelivery: form.values.billingAddress.sameAsDelivery,
        });
  }, [form.values.billingAddress.sameAsDelivery]);

  return (
    <>
      <UnstyledButton
        classNames={{
          root: 'p-[10px] rounded-sm',
        }}
        styles={{ root: { border: '1px solid #C8C8C8' } }}
        onClick={open}
      >
        <Edit2 size={16} color='black' />
      </UnstyledButton>

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
          <div className='flex gap-6'>
            {/* Delivery Options */}
            <div className='flex flex-1 flex-col gap-8'>
              <h3 className='text-xl/6 font-bold'>Delivery Options</h3>

              {/*Input Country*/}
              <div>
                <TextInput
                  label='Country'
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('shippingAddress.country').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('shippingAddress.country')}
                />
              </div>

              {/*Input City*/}
              <div>
                <TextInput
                  label='City'
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('shippingAddress.city').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('shippingAddress.city')}
                />
              </div>

              {/*Input Street*/}
              <div>
                <TextInput
                  label='Street'
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('shippingAddress.street').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('shippingAddress.street')}
                />
              </div>

              {/*Input Apartment*/}
              <div>
                <TextInput
                  label='Apartment'
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('shippingAddress.apartment').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('shippingAddress.apartment')}
                />
              </div>
            </div>

            {/* Billing Options */}
            <div className='flex flex-1 flex-col gap-8'>
              <h3 className='text-xl/6 font-bold'>Billing Options</h3>

              {/*Input Country*/}
              <div>
                <TextInput
                  label='Country'
                  disabled={form.values.billingAddress.sameAsDelivery}
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('billingAddress.country').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('billingAddress.country')}
                />
              </div>

              {/*Input City*/}
              <div>
                <TextInput
                  label='City'
                  disabled={form.values.billingAddress.sameAsDelivery}
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('billingAddress.city').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('billingAddress.city')}
                />
              </div>

              {/*Input Street*/}
              <div>
                <TextInput
                  label='Street'
                  disabled={form.values.billingAddress.sameAsDelivery}
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('billingAddress.street').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('billingAddress.street')}
                />
              </div>

              {/*Input Apartment*/}
              <div>
                <TextInput
                  label='Apartment'
                  disabled={form.values.billingAddress.sameAsDelivery}
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('billingAddress.apartment').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('billingAddress.apartment')}
                />
              </div>
            </div>
          </div>

          <div className='mt-8'>
            <Checkbox
              label='Billing Address Same As Delivery'
              classNames={{
                root: 'group',
                body: 'checkbox-body',
                inner: 'checkbox-inner',
                input: 'checkbox-input',
                label: 'checkbox-label',
              }}
              {...form.getInputProps('billingAddress.sameAsDelivery', {
                type: 'checkbox',
              })}
            />
          </div>

          <Radio.Group
            {...form.getInputProps('shippingMethod')}
            label='Shipment Method'
            classNames={{ label: 'text-xl/6 font-bold py-8' }}
          >
            <Radio
              color='white'
              iconColor='black'
              icon={Dot}
              classNames={{
                root: 'mb-3',
                radio: 'border-[1px] border-black p-0 cursor-pointer ',
                icon: 'scale-[10] sm:-translate-x-[3%]',
              }}
              value='standard'
              label='Standard Shipping'
            />
            <Radio
              color='white'
              iconColor='black'
              icon={Dot}
              classNames={{
                radio: 'border-[1px] border-black p-0 cursor-pointer',
                icon: 'scale-[10] sm:-translate-x-[3%]',
              }}
              value='express'
              label='Fast Shipping'
            />
          </Radio.Group>
        </Form>

        {/* Modal Content */}
        <ModalFooter
          singleBtn={false}
          secondaryBtnText='Cancel'
          secondaryBtnOnClick={close}
          primaryBtnText='Save'
          primaryBtnOnClick={form.onSubmit((values) => {
            if (form.isDirty()) handleUpdate(values);
          })}
        />
      </Modal>

      <Notify {...props} onClose={clear} />
    </>
  );
};
