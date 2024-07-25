import { Modal, Radio, TextInput, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit2, Dot } from 'lucide-react';
import { useContext, useEffect } from 'react';

import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { Form, useForm } from '@mantine/form';
import { Order } from '@/shared/types/types';
import { cn } from '@/shared/lib/utils';
import Checkbox from '@/components/Checkbox';
import { useUpdateOrderMutation } from '@/shared/api/ordersApi';
import { notifyContext } from '@/shared/context/notification.context';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';

type Props = {
  order: Order;
};
export const ShippingModal = ({ order }: Props) => {
  const [isOpened, { open, close }] = useDisclosure();
  const [dispatch] = useUpdateOrderMutation();
  const { setNotification } = useContext(notifyContext);

  const form = useForm({
    initialValues: {
      billingAddress: {
        country: order.billingAddress.country,
        city: order.billingAddress.city,
        addressLine1: order.billingAddress.addressLine1 || '',
        addressLine2: order.billingAddress.addressLine2 || '',
        state: order.billingAddress.state,
        zip: order.billingAddress.zip,
        phoneNumber: order.billingAddress.phoneNumber,
        company: order.billingAddress.company,
        sameAsDelivery: false,
      },
      shippingAddress: {
        country: order.shippingAddress.country,
        city: order.shippingAddress.city,
        addressLine1: order.shippingAddress.addressLine1 || '',
        addressLine2: order.shippingAddress.addressLine2 || '',
        state: order.shippingAddress.state,
        zip: order.shippingAddress.zip,
        phoneNumber: order.shippingAddress.phoneNumber,
        company: order.shippingAddress.company,
      },
      shippingMethod: order.shippingMethodDTO.name,
    },
  });

  const handleUpdate = async (values: typeof form.values) => {
    try {
      const { sameAsDelivery, ...billingAddressRest } = values.billingAddress;

      const shippingAddress: Order['shippingAddress'] = {
        ...values.shippingAddress,
        firstName: order.shippingAddress.firstName,
        lastName: order.shippingAddress.lastName,
      };

      const billingAddress: Order['billingAddress'] = sameAsDelivery
        ? shippingAddress
        : {
            ...billingAddressRest,
            firstName: order.billingAddress.firstName,
            lastName: order.billingAddress.lastName,
          };

      let request = {
        orderNumber: order.number,
        paymentMethod: order.paymentMethod,
        commentOfManager: order.commentOfManager || '',
        shippingAddress,
        billingAddress,
        shippingMethodId: 1,
      };
      await dispatch(request);
      close();
      setNotification('Success', 'Changes saved!');
    } catch (err) {
      console.error(err);
      close();
      if (isAxiosQueryError(err)) {
        setNotification(
          'Failed',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      }
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
          header: 'hidden',
          content: 'py-[14px] px-6',
        }}
      >
        <ModalHeader heading='Edit Order Details' handleClose={close} />
        {/* Modal Content */}

        <form>
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
                      form.getInputProps('shippingAddress.addressLine1')
                        .error && 'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('shippingAddress.addressLine1')}
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
                      form.getInputProps('billingAddress.addressLine1').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('billingAddress.addressLine1')}
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
                radio: 'border border-black p-0 cursor-pointer ',
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
                radio: 'border border-black p-0 cursor-pointer',
                icon: 'scale-[10] sm:-translate-x-[3%]',
              }}
              value='express'
              label='Fast Shipping'
            />
          </Radio.Group>
        </form>

        {/* Modal Content */}
        <ModalFooter
          singleBtn={false}
          secondaryBtnText='Cancel'
          secondaryBtnOnClick={close}
          primaryBtnText='Save'
          primaryBtnOnClick={() => {
            if (form.isDirty()) handleUpdate(form.values);
          }}
        />
      </Modal>
    </>
  );
};
