import { Modal, Radio, TextInput, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit2, Dot } from 'lucide-react';
import { useEffect } from 'react';

import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { useForm } from '@mantine/form';
import { Order } from '@/shared/types/types';
import { cn } from '@/shared/lib/utils';
import Checkbox from '@/components/Checkbox';
import { useUpdateOrderMutation } from '@/shared/api/ordersApi';
import {
  brandNotification,
  isAxiosQueryError,
  isErrorDataString,
} from '@/shared/lib/helpers';
import { useGetShippingMethodsQuery } from '@/shared/api/shippingMethodsApi';

type Props = {
  order: Order;
};
export const ShippingModal = ({ order }: Props) => {
  const [isOpened, { open, close }] = useDisclosure();
  const [dispatch] = useUpdateOrderMutation();
  const { data, isLoading, error } = useGetShippingMethodsQuery();

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
      shippingMethod: `${order.shippingMethodDTO.id}`,
    },
  });

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

  if (error) return <p>Whoops, something went wrong!</p>;
  if (isLoading || !data) return null;

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
        shippingMethodId: values.shippingMethod,
      };
      await dispatch(request).unwrap();
      close();
      brandNotification('SUCCESS', 'Changes saved!');
    } catch (err) {
      console.error(err);
      close();
      if (isAxiosQueryError(err)) {
        brandNotification(
          'ERROR',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      }
    }
  };

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

              {/*Input State*/}
              <div>
                <TextInput
                  label='State'
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('shippingAddress.state').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('shippingAddress.state')}
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

              {/*Input ZIP*/}
              <div>
                <TextInput
                  label='Postal Code'
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('shippingAddress.zip').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('shippingAddress.zip')}
                />
              </div>

              {/*Input Address 2*/}
              <div>
                <TextInput
                  label='Address 2'
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('shippingAddress.addressLine2')
                        .error && 'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('shippingAddress.addressLine2')}
                />
              </div>

              {/*Input Company*/}
              <div>
                <TextInput
                  label='Company'
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('shippingAddress.company').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('shippingAddress.company')}
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

              {/*Input State*/}
              <div>
                <TextInput
                  label='State'
                  disabled={form.values.billingAddress.sameAsDelivery}
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('billingAddress.state').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('billingAddress.state')}
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

              {/*Input ZIP*/}
              <div>
                <TextInput
                  label='Postal Code'
                  disabled={form.values.billingAddress.sameAsDelivery}
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('billingAddress.zip').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('billingAddress.zip')}
                />
              </div>

              {/*Input Address 2*/}
              <div>
                <TextInput
                  label='Address 2'
                  disabled={form.values.billingAddress.sameAsDelivery}
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('billingAddress.addressLine2').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('billingAddress.addressLine2')}
                />
              </div>

              {/*Input Company*/}
              <div>
                <TextInput
                  label='Company'
                  disabled={form.values.billingAddress.sameAsDelivery}
                  classNames={{
                    input: cn(
                      'form-input h-full',
                      form.getInputProps('billingAddress.company').error &&
                        'form-error--input'
                    ),
                    root: 'form-root',
                    label: 'form-label',
                    error: 'form-error',
                  }}
                  {...form.getInputProps('billingAddress.company')}
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
            {data.content.map((item, index) => (
              <Radio
                key={index}
                color='white'
                iconColor='black'
                icon={Dot}
                classNames={{
                  root: 'mb-3',
                  radio: '!border !border-black p-0 cursor-pointer',
                  icon: 'scale-[10]',
                }}
                value={`${item.id}`}
                label={item.name}
              />
            ))}
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
