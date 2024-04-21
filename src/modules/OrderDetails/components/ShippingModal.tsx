import { Button, Modal, Radio, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit2, Dot } from 'lucide-react';

import styles from '@/modules/AddProductModal/AddProductModal.module.css';
import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { Form, useForm } from '@mantine/form';
import { Order, ParsedShippingAddress } from '@/shared/types/types';
import { dirtyFields } from '@/shared/lib/helpers';
import { cn } from '@/shared/lib/utils';
import { useEffect } from 'react';
import Checkbox from '@/components/Checkbox';

type Props = {
  order: Order;
};

export const ShippingModal = ({ order }: Props) => {
  const [isOpened, { open, close }] = useDisclosure();

  const billingAddress: ParsedShippingAddress = JSON.parse(
    order.billingAddress
  );
  const shippingAddress: ParsedShippingAddress = JSON.parse(
    order.shippingAddress
  );

  const form = useForm({
    initialValues: {
      billingAddress: {
        country: billingAddress.country,
        city: billingAddress.city,
        street: billingAddress.street,
        apartment: billingAddress.apartment,
        sameAsDelivery: false,
      },
      shippingAddress: {
        country: shippingAddress.country,
        city: shippingAddress.city,
        street: shippingAddress.street,
        apartment: shippingAddress.apartment,
      },
      shippingMethod: order.shippingMethod,
    },
  });

  useEffect(() => {
    form.values.billingAddress.sameAsDelivery
      ? form.setFieldValue('billingAddress', {
          ...form.values.shippingAddress,
          sameAsDelivery: form.values.billingAddress.sameAsDelivery,
        })
      : form.setFieldValue('billingAddress', {
          ...billingAddress,
          sameAsDelivery: form.values.billingAddress.sameAsDelivery,
        });
  }, [form.values.billingAddress.sameAsDelivery]);

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
            console.log(values);
          })}
        />
      </Modal>
    </>
  );
};
