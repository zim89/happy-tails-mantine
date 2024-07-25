'use client';

import { useResetPasswordMutation } from '@/shared/api/authApi';
import { cn } from '@/shared/lib/utils';
import { Button, TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ForgotPasswordForm() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail('Invalid email'),
    },
  });

  type FormValues = typeof form.values;

  const onSubmit = async (values: FormValues) => {
    try {
      const data = await resetPassword(values).unwrap();
      console.log('Reset Password:', data);
    } catch (error) {
      console.log(error);
      toast.error('Oops! Something went wrong! Try again later.');
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className='space-y-8'>
      <TextInput
        radius='xs'
        label='Email'
        placeholder=''
        {...form.getInputProps('email')}
        classNames={{
          root: 'form-root',
          label: 'form-label',
          input: cn('form-input', form?.errors?.email && 'form-error--input'),
          error: 'form-error',
        }}
      />

      <Button type='submit' className='btn btn-primary w-full'>
        Send
      </Button>
    </form>
  );
}
