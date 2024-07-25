'use client';

import { Card, Checkbox, Divider, Radio, Select } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { ChevronDown } from 'lucide-react';

import { NewOrderFields } from '@/shared/hooks/useNewOrderFormModel';
import { cn } from '@/shared/lib/utils';
import { ShippingMethod } from '@/shared/types/shippingMethod.types';

type Props = {
  deliveries: ShippingMethod[];
  form: UseFormReturnType<
    NewOrderFields,
    (values: NewOrderFields) => NewOrderFields
  >;
};

export default function ShippingAndPayment({ form, deliveries }: Props) {
  return (
    <>
      <Card>
        <h3 className='mb-2 text-xl/6 font-bold'>Shipping Method</h3>
        <Divider className='mb-6' />
        <Radio.Group {...form.getInputProps('shippingMethod')}>
          {deliveries.map((del) => (
            <Radio
              key={del.id}
              label={del.name + ' Shipping'}
              value={del.name}
              classNames={{
                root: 'group mb-4',
                inner: 'radio-inner',
                radio: 'radio-radio',
              }}
            />
          ))}
        </Radio.Group>
      </Card>
      <Card>
        <h3 className='mb-2 text-xl/6 font-bold'>Payment</h3>
        <Divider className='mb-6' />
        <Select
          label='Payment method'
          withCheckIcon={false}
          rightSection={<ChevronDown className='text-secondary' />}
          defaultSearchValue='Credit or Debit Card'
          data={['Credit or Debit Card', 'Cash Payment']}
          classNames={{
            root: 'max-w-[19.625rem] form-root',
            input: cn(
              'form-input text-center',
              form?.errors?.paymentMethod && 'form-error--input'
            ),
            option: 'justify-center',
            label: 'form-label',
            error: 'form-error',
          }}
          {...form.getInputProps('paymentMethod')}
        />
      </Card>
      <Checkbox
        label='Send order confirmation email'
        classNames={{
          root: 'group',
          body: 'checkbox-body',
          inner: 'checkbox-inner',
          input: 'checkbox-input',
          label: 'checkbox-label',
        }}
        {...form.getInputProps('sendEmail', {
          type: 'checkbox',
        })}
      />
    </>
  );
}
