'use client';

import { Group, TextInput, UnstyledButton } from '@mantine/core';
import { hasLength, isNotEmpty, useForm } from '@mantine/form';

import classes from '../styles.module.css';
import { cn } from '@/shared/lib/utils';
import { useUpdateDetailsMutation } from '@/shared/api/authApi';
import { cleanPostcode, dirtyFields } from '@/shared/lib/helpers';
import { useAuth } from '@/shared/hooks/useAuth';
import { LocationFields } from './LocationFields';
import { PostalCodeField } from './PostalCodeField';
import { LoaderBackground } from '@/components/LoaderBackground';
import { toast } from 'react-toastify';

export const DeliveryForm = () => {
  const { currentUser } = useAuth();
  const [updateUser, { isLoading }] = useUpdateDetailsMutation();

  const form = useForm({
    initialValues: {
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      country: currentUser?.shippingAddress?.country || '',
      city: currentUser?.shippingAddress?.city || '',
      postcode: currentUser?.shippingAddress?.zip || '',
      company: currentUser?.shippingAddress?.company || '',
      addressOne: currentUser?.shippingAddress?.addressLine1 || '',
      addressTwo: currentUser?.shippingAddress?.addressLine2 || '',
      contactNumber: currentUser?.phoneNumber || '',
      county: currentUser?.shippingAddress?.state || '',
    },

    transformValues(values) {
      const parsedPostcode = cleanPostcode(values.postcode);

      return {
        ...values,
        postcode: parsedPostcode,
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

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const [_, count] = dirtyFields(values);
      // If there are no changes, omit the call to API

      if (count === 0) return;
      if (!currentUser) return;

      const { registerDate, userId, roles, ...prevUser } = currentUser;

      const request = {
        ...prevUser,
        phoneNumber: prevUser.phoneNumber
          ? prevUser.phoneNumber
          : '+00-000-000-0000',
        billingAddress: prevUser.billingAddress ?? {
          firstName: prevUser.firstName,
          lastName: prevUser.lastName,
          company: '',
          country: '',
          zip: '',
          state: '',
          city: '',
          addressLine1: '',
          addressLine2: '',
          phoneNumber: prevUser.phoneNumber
            ? prevUser.phoneNumber
            : '+00-000-000-0000',
        },
        shippingAddress: {
          firstName: values.firstName,
          lastName: values.lastName,
          company:
            values.company || (prevUser.shippingAddress.company ?? 'None'),
          country: values.country,
          zip: values.postcode,
          state: values.county,
          city: values.city,
          addressLine1: values.addressOne,
          addressLine2:
            values.addressTwo ||
            (prevUser.shippingAddress?.addressLine2 ?? ' '),
          phoneNumber: values.contactNumber,
        },
      };

      const res = await updateUser(request);

      console.log(res);

      // form.clearErrors();
      // form.reset();
    } catch (err) {
      console.error('Error: ', err);
      toast.error('Oops! Something went wrong! Try again later.');
    }
  };

  return (
    <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
      <Group className={classes.fieldsGroup}>
        <TextInput
          withAsterisk
          classNames={{
            root: cn('form-root', classes.fieldSizing),
            label: 'form-label block text-left',
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
            label: 'form-label block text-left',
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
        <LocationFields form={form} />
      </Group>

      <Group className={classes.fieldsGroup}>
        <PostalCodeField form={form} />
        <TextInput
          classNames={{
            root: cn('form-root', classes.fieldSizing),
            label: 'form-label block text-left',
            input: 'form-input',
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
            label: 'form-label block text-left',
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
            label: 'form-label block text-left',
            input: 'form-input',
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
            label: 'form-label block text-left',
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
            label: 'form-label block text-left',
            input: 'form-input',
          }}
          label='County'
          {...form.getInputProps('county')}
          placeholder='Enter County'
        />
      </Group>
      <LoaderBackground loading={isLoading} className='mb-16 mt-6 md:mb-28'>
        <UnstyledButton
          type='submit'
          className={cn('btn', classes.submitAddress)}
        >
          Add Address
        </UnstyledButton>
      </LoaderBackground>
    </form>
  );
};
