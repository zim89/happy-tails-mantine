'use client';
import { cn } from '@/shared/lib/utils';
import { Button, Group, TextInput } from '@mantine/core';
import { hasLength, isNotEmpty, useForm } from '@mantine/form';

import classes from '../styles.module.css';

export const DeliveryForm = () => {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      postcode: '',
      company: '',
      addressOne: '',
      addressTwo: '',
      contactNumber: '',
      county: '',
    },

    transformValues(values) {
      return {
        ...values,
        addressTwo: values.addressOne,
      };
    },

    validate: {
      firstName: hasLength({ min: 2 }, 'Field must have 2 or more characters'),
      lastName: hasLength({ min: 2 }, 'Field must have 2 or more characters'),
      country: isNotEmpty('Please enter a country name.'),
      city: isNotEmpty('Please enter a city name.'),
      postcode: isNotEmpty('Please enter a postcode.'),
      addressOne: isNotEmpty('Please enter an address.'),
      contactNumber: isNotEmpty('Please enter a contact number.'),
    },
  });

  return (
    <form
      className={classes.form}
      onSubmit={form.onSubmit((values) => {
        console.log(values);
        form.clearErrors();
        form.reset();
      })}
    >
      <Group className={classes.fieldsGroup}>
        <TextInput
          withAsterisk
          classNames={{
            root: cn('form-root', classes.fieldSizing),
            label: 'form-label',
            input: cn(
              'form-input',
              form?.errors?.firstName && 'form-error--input'
            ),
            error: 'form-error',
          }}
          label='First Name'
          {...form.getInputProps('firstName')}
          placeholder='Enter Your First Name'
        />
        <TextInput
          withAsterisk
          classNames={{
            root: cn('form-root', classes.fieldSizing),
            label: 'form-label',
            input: cn(
              'form-input',
              form?.errors?.lastName && 'form-error--input'
            ),
            error: 'form-error',
          }}
          label='Last Name'
          {...form.getInputProps('lastName')}
          placeholder='Enter Your Last Name'
        />
      </Group>
      <Group className={classes.fieldsGroup}>
        <TextInput
          withAsterisk
          classNames={{
            root: cn('form-root', classes.fieldSizing),
            label: 'form-label',
            input: cn(
              'form-input',
              form?.errors?.country && 'form-error--input'
            ),
            error: 'form-error',
          }}
          type='country'
          label='Country'
          {...form.getInputProps('country')}
          placeholder='Enter Country'
        />
        <TextInput
          withAsterisk
          classNames={{
            root: cn('form-root', classes.fieldSizing),
            label: 'form-label',
            input: cn('form-input', form?.errors?.city && 'form-error--input'),
            error: 'form-error',
          }}
          label='Town / City'
          {...form.getInputProps('city')}
          placeholder='Enter Town / City'
        />
      </Group>
      <Group className={classes.fieldsGroup}>
        <TextInput
          withAsterisk
          classNames={{
            root: cn('form-root', classes.fieldSizing),
            label: 'form-label',
            input: cn(
              'form-input',
              form?.errors?.postcode && 'form-error--input'
            ),
            error: 'form-error',
          }}
          label='Postcode'
          {...form.getInputProps('postcode')}
          placeholder='Enter Postcode'
        />
        <TextInput
          classNames={{
            root: cn('form-root', classes.fieldSizing),
            label: 'form-label',
            input: 'form-input'
          }}
          label='Company'
          {...form.getInputProps('company')}
          placeholder='Enter Company'
        />
      </Group>
      <Group className={classes.fieldsGroup}>
        <TextInput
          withAsterisk
          classNames={{
            root: cn('form-root', classes.fieldSizing),
            label: 'form-label',
            input: cn(
              'form-input',
              form?.errors?.addressOne && 'form-error--input'
            ),
            error: 'form-error',
          }}
          label='Address Line 1'
          {...form.getInputProps('addressOne')}
          placeholder='Enter Address Line 1'
        />
        <TextInput
          classNames={{
            root: cn('form-root', classes.fieldSizing),
            label: 'form-label',
            input: 'form-input'
          }}
          label='Address Line 2'
          {...form.getInputProps('addressTwo')}
          placeholder='Enter Address Line 2'
        />
      </Group>
      <Group className={classes.fieldsGroup}>
        <TextInput
          withAsterisk
          classNames={{
            root: cn('form-root', classes.fieldSizing),
            label: 'form-label',
            input: cn(
              'form-input',
              form?.errors?.contactNumber && 'form-error--input'
            ),
            error: 'form-error',
          }}
          label='Contact Number'
          {...form.getInputProps('contactNumber')}
          placeholder='Enter Contact Number'
        />
        <TextInput
          classNames={{
            root: cn('form-root', classes.fieldSizing),
            label: 'form-label',
            input: 'form-input'
          }}
          label='County'
          {...form.getInputProps('county')}
          placeholder='Enter County'
        />
      </Group>
      <Button
        type='submit'
        className='mt-6 bg-black uppercase md:w-[380px] lg:w-[315px]'
      >
        Add Address
      </Button>
    </form>
  );
};
