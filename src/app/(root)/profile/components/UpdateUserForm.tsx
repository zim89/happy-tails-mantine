'use client';

import { TextInput, UnstyledButton } from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';

import { cn } from '@/shared/lib/utils';
import classes from '../styles.module.css';
import { useUpdateDetailsMutation } from '@/shared/api/authApi';
import { useAuth } from '@/shared/hooks/useAuth';
import { toast } from 'react-toastify';

export const UpdateUserForm = () => {
  const { currentUser } = useAuth();
  const [updateUser] = useUpdateDetailsMutation();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      sendOffersAndNews: false,
    },

    validate: {
      firstName: isNotEmpty('Please enter your first name'),
      lastName: isNotEmpty('Please enter your last name'),
      email: isEmail('Please enter a valid email address'),
    },
  });

  return (
    <form
      className={classes.form}
      onSubmit={form.onSubmit(async (values) => {
        try {
          if (!currentUser) return;

          const {
            registerDate,
            userId,
            roles,
            email: currentUserEmail,
            ...prevUser
          } = currentUser;

          const {
            sendOffersAndNews,
            email: emailField,
            ...formFields
          } = values;

          const request = {
            ...prevUser,
            ...formFields,
            phoneNumber: !!prevUser.phoneNumber.trim()
              ? prevUser.phoneNumber
              : '+16-573-698-7573',
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
              phoneNumber: !!prevUser.phoneNumber.trim()
                ? prevUser.phoneNumber
                : '+16-573-698-7573',
            },
            shippingAddress: prevUser.shippingAddress ?? {
              firstName: prevUser.firstName,
              lastName: prevUser.lastName,
              company: '',
              country: '',
              zip: '',
              state: '',
              city: '',
              addressLine1: '',
              addressLine2: '',
              phoneNumber: !!prevUser.phoneNumber.trim()
                ? prevUser.phoneNumber
                : '+16-573-698-7573',
            },
          };

          await updateUser(request).unwrap();

          form.clearErrors();
          form.reset();
        } catch (err) {
          toast.error('Something went wrong. Please try again later.');
          console.log(err);
        }
      })}
    >
      <TextInput
        withAsterisk
        label='First Name'
        type='text'
        classNames={{
          root: 'form-root',
          label: 'form-label block text-left',
          input: cn(
            'form-input',
            classes.inputSizing,
            form?.errors?.firstName && 'form-error--input'
          ),
          error: 'form-error',
        }}
        {...form.getInputProps('firstName')}
      />
      <TextInput
        withAsterisk
        label='Last Name'
        type='text'
        classNames={{
          root: 'form-root',
          label: 'form-label block text-left',
          input: cn(
            'form-input',
            classes.inputSizing,
            form?.errors?.lastName && 'form-error--input'
          ),
          error: 'form-error',
        }}
        {...form.getInputProps('lastName')}
      />
      <TextInput
        withAsterisk
        label='Email Address'
        classNames={{
          root: 'form-root',
          label: 'form-label block text-left',
          input: cn(
            'form-input',
            classes.inputSizing,
            form?.errors?.email && 'form-error--input'
          ),
          error: 'form-error',
        }}
        {...form.getInputProps('email')}
      />
      <UnstyledButton
        type='submit'
        className={cn(
          'btn mt-9 bg-secondary uppercase text-primary',
          classes.inputSizing
        )}
      >
        Update
      </UnstyledButton>
    </form>
  );
};
