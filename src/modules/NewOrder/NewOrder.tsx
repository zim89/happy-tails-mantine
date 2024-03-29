'use client';

import {
  Button,
  Card,
  Checkbox,
  Combobox,
  Divider,
  Radio,
  Select,
  SimpleGrid,
  TextInput,
  Textarea,
  useCombobox,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type NewOrderFields = {
  items: string[];
  email: string;
  address: {
    firstName: string;
    secondName: string;
    country: string;
    city: string;
    street: string;
    apartment: string;
  };
  billingAddress: {
    sameAsDelivery: boolean;
    firstName: string;
    secondName: string;
    country: string;
    city: string;
    street: string;
    apartment: string;
  };
  shippingMethod: string;
  paymentMethod: string;
  promoCode: string;
  sendEmail: boolean;
  comment: string;
};

export default function NewOrder() {
  const combobox = useCombobox();
  const [itemFilter, setItemFilter] = useState('');

  const form = useForm<NewOrderFields>({
    initialValues: {
      items: [],
      email: '',

      address: {
        firstName: '',
        secondName: '',
        country: '',
        city: '',
        street: '',
        apartment: '',
      },

      billingAddress: {
        sameAsDelivery: true,
        firstName: '',
        secondName: '',
        country: '',
        city: '',
        street: '',
        apartment: '',
      },
      shippingMethod: 'standard',
      paymentMethod: 'card',
      promoCode: '',
      sendEmail: true,
      comment: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <form className='space-y-12' onSubmit={form.onSubmit(console.log)}>
      <Card>
        <h3 className='mb-2 text-xl/6 font-bold'>Product Options</h3>
        <Divider className='mb-6' />
        <Combobox
          onOptionSubmit={(value) => {
            form.setFieldValue('items', (prev) => [...prev, value]);
          }}
          store={combobox}
        >
          <Combobox.Target>
            {/*Input Item*/}
            <div className={'flex flex-col gap-2'}>
              <label className={'text-sm/normal'}>Item</label>
              <TextInput
                classNames={{
                  input: 'text-input max-w-[15.875rem]',
                }}
                value={itemFilter}
                onChange={(event) => {
                  setItemFilter(event.currentTarget.value);
                  combobox.openDropdown();
                  combobox.updateSelectedOptionIndex();
                }}
                onClick={() => combobox.openDropdown()}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
              />
              <p className='text-xs/normal'>
                To search for a product, enter the article or name
              </p>
            </div>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>{/* TODO: add options */}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Card>
      <Card>
        <h3 className='mb-2 text-xl/6 font-bold'>Delivery Options</h3>
        <Divider className='mb-6' />

        {/*Input Email*/}
        <div className={'flex flex-col gap-2'}>
          <label className={'text-sm/normal'}>Email</label>
          <TextInput
            classNames={{
              wrapper: 'mb-2',
              input: 'text-input max-w-[19.5rem]',
            }}
            {...form.getInputProps('email')}
          />
        </div>

        <div
          className={
            'mb-11 grid max-w-[40.75rem] grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-7 md:gap-y-2'
          }
        >
          {/*Input First Name*/}
          <div className={'flex flex-col gap-2'}>
            <label className={'text-sm/normal'}>First name</label>
            <TextInput
              classNames={{
                input: 'text-input',
              }}
              {...form.getInputProps('address.firstName')}
            />
          </div>

          {/*Input Second Name*/}
          <div className={'flex flex-col gap-2'}>
            <label className={'text-sm/normal'}>Second name</label>
            <TextInput
              classNames={{
                input: 'text-input',
              }}
              {...form.getInputProps('address.secondName')}
            />
          </div>

          {/*Input Country*/}
          <div className={'flex flex-col gap-2'}>
            <label className={'text-sm/normal'}>Country</label>
            <TextInput
              classNames={{
                input: 'text-input',
              }}
              {...form.getInputProps('address.country')}
            />
          </div>

          {/*Input City*/}
          <div className={'flex flex-col gap-2'}>
            <label className={'text-sm/normal'}>City</label>
            <TextInput
              classNames={{
                input: 'text-input',
              }}
              {...form.getInputProps('address.city')}
            />
          </div>

          {/*Input Street*/}
          <div className={'flex flex-col gap-2'}>
            <label className={'text-sm/normal'}>Street</label>
            <TextInput
              classNames={{
                input: 'text-input',
              }}
              {...form.getInputProps('address.street')}
            />
          </div>

          {/*Input Apartment*/}
          <div className={'flex flex-col gap-2'}>
            <label className={'text-sm/normal'}>Apartment</label>
            <TextInput
              classNames={{
                input: 'text-input',
              }}
              {...form.getInputProps('address.apartment')}
            />
          </div>
        </div>

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

        {!form.values.billingAddress.sameAsDelivery && (
          <>
            <h3 className='mb-2 mt-6 text-xl/6 font-bold'>Billing Options</h3>
            <div
              className={
                'grid max-w-[40.75rem] grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-7 md:gap-y-2'
              }
            >
              {/*Input First Name*/}
              <div className={'flex flex-col gap-2'}>
                <label className={'text-sm/normal'}>First name</label>
                <TextInput
                  classNames={{
                    input: 'text-input',
                  }}
                  {...form.getInputProps('billingAddress.firstName')}
                />
              </div>

              {/*Input Second Name*/}
              <div className={'flex flex-col gap-2'}>
                <label className={'text-sm/normal'}>Second name</label>
                <TextInput
                  classNames={{
                    input: 'text-input',
                  }}
                  {...form.getInputProps('billingAddress.secondName')}
                />
              </div>

              {/*Input Country*/}
              <div className={'flex flex-col gap-2'}>
                <label className={'text-sm/normal'}>Country</label>
                <TextInput
                  classNames={{
                    input: 'text-input',
                  }}
                  {...form.getInputProps('billingAddress.country')}
                />
              </div>

              {/*Input City*/}
              <div className={'flex flex-col gap-2'}>
                <label className={'text-sm/normal'}>City</label>
                <TextInput
                  classNames={{
                    input: 'text-input',
                  }}
                  {...form.getInputProps('billingAddress.city')}
                />
              </div>

              {/*Input Street*/}
              <div className={'flex flex-col gap-2'}>
                <label className={'text-sm/normal'}>Street</label>
                <TextInput
                  classNames={{
                    input: 'text-input',
                  }}
                  {...form.getInputProps('billingAddress.street')}
                />
              </div>

              {/*Input Apartment*/}
              <div className={'flex flex-col gap-2'}>
                <label className={'text-sm/normal'}>Apartment</label>
                <TextInput
                  classNames={{
                    input: 'text-input',
                  }}
                  {...form.getInputProps('billingAddress.apartment')}
                />
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <h3 className='mb-2 text-xl/6 font-bold'>Shipping Method</h3>
        <Divider className='mb-6' />
        <Radio.Group {...form.getInputProps('shippingMethod')}>
          <Radio
            label='Standard Shipping'
            value='standard'
            classNames={{
              root: 'group mb-4',
              inner: 'radio-inner',
              radio: 'radio-radio',
            }}
          />
          <Radio
            label='Standard Shipping'
            value='standard 2'
            classNames={{
              root: 'group',
              inner: 'radio-inner',
              radio: 'radio-radio',
            }}
          />
        </Radio.Group>
      </Card>

      <Card>
        <h3 className='mb-2 text-xl/6 font-bold'>Payment</h3>
        <Divider className='mb-6' />
        <Select
          label='Payment method'
          withCheckIcon={false}
          rightSection={<ChevronDown className='text-secondary' />}
          data={['Credit or Debit Card', 'Cash Payment']}
          classNames={{
            root: 'max-w-[19.625rem]',
            input: 'text-center',
            option: 'justify-center',
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

      {/*Add Comments*/}
      <div className={'flex flex-col gap-2'}>
        <label className={'text-sm/normal'}>Add comments</label>
        <Textarea
          classNames={{
            input: 'text-input min-h-[14.375rem]',
            wrapper: 'max-w-[40.75rem]',
          }}
          {...form.getInputProps('comment')}
        />
      </div>

      <div>
        <Button size='md' variant='default' onClick={form.reset}>
          Cancel
        </Button>
        <Button size='md' className='ml-6 bg-black' type='submit'>
          Save
        </Button>
      </div>
    </form>
  );
}
