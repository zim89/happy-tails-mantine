import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { TextInput, UnstyledButton } from '@mantine/core';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import { cn } from '@/shared/lib/utils';
import classes from '../styles.module.css';
import { useUpdateDetailsMutation } from '@/shared/api/authApi';
import { useAuth } from '@/shared/hooks/useAuth';
import { useAppDispatch } from '@/shared/redux/store';
import { setAuthData } from '@/shared/redux/auth/authSlice';
import { LoaderBackground } from '@/components/LoaderBackground';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';

export const UpdateUserForm = () => {
  const { currentUser } = useAuth();
  const [updateUser, { isLoading }] = useUpdateDetailsMutation();
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: {
      firstName: currentUser?.firstName ?? '',
      lastName: currentUser?.lastName ?? '',
      sendOffersAndNews: currentUser?.emailVerified ?? false,
    },

    validate: {
      firstName: isNotEmpty('Please enter your first name'),
      lastName: isNotEmpty('Please enter your last name'),
    },
  });

  useEffect(() => {
    form.setValues({
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      sendOffersAndNews: currentUser?.emailVerified,
    });
  }, [
    currentUser?.firstName,
    currentUser?.lastName,
    currentUser?.emailVerified,
  ]);

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

          const { sendOffersAndNews, ...formFields } = values;

          const request = {
            ...prevUser,
            ...formFields,
            phoneNumber: prevUser.phoneNumber
              ? prevUser.phoneNumber.replace(/\"/g, '')
              : '+8-240-158-9939',
            billingAddress: prevUser.billingAddress ?? {
              firstName: formFields.firstName,
              lastName: formFields.lastName,
              company: '',
              country: '',
              zip: '',
              state: '',
              city: '',
              addressLine1: '',
              addressLine2: '',
              phoneNumber: prevUser.phoneNumber
                ? prevUser.phoneNumber
                : '+8-240-158-9939',
            },
            shippingAddress: prevUser.shippingAddress ?? {
              firstName: formFields.firstName,
              lastName: formFields.lastName,
              company: '',
              country: '',
              zip: '',
              state: '',
              city: '',
              addressLine1: '',
              addressLine2: '',
              phoneNumber: prevUser.phoneNumber
                ? prevUser.phoneNumber
                : '+8-240-158-9939',
            },
          };

          await updateUser(request).unwrap();
          dispatch(
            setAuthData({
              ...currentUser,
              firstName: formFields.firstName,
              lastName: formFields.lastName,
            })
          );

          form.clearErrors();
          form.reset();

          toast.success('Profile updated successfully!');
        } catch (err) {
          console.error('Error: ', err);
          if (isAxiosQueryError(err)) {
            toast.error(
              isErrorDataString(err.data) ? err.data : err.data.message
            );
          }
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

      <LoaderBackground loading={isLoading} className='mt-9'>
        <UnstyledButton
          type='submit'
          className={cn(
            'btn bg-secondary uppercase text-primary',
            classes.inputSizing
          )}
        >
          Update
        </UnstyledButton>
      </LoaderBackground>
    </form>
  );
};
