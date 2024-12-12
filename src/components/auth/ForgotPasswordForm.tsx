'use client';

import { useResetPasswordMutation } from '@/shared/api/authApi';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { handleError } from '@/shared/helpers/error.helpers';
import { cn } from '@/shared/lib/utils';
import { Button, TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ForgotPasswordForm() {
  const router = useRouter();
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
      await resetPassword(values).unwrap();
      router.push(`${APP_PAGES.UPDATE_PASSWORD}?email=${values.email}`);
    } catch (error) {
      handleError(error, toast.error);
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

      <Button
        type='submit'
        loading={isLoading}
        className='btn btn-primary w-full'
      >
        Send
      </Button>
    </form>
  );
}
