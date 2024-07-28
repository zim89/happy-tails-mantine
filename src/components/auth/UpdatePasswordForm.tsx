'use client';
import { useResetPasswordVerifyMutation } from '@/shared/api/authApi';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { cn } from '@/shared/lib/utils';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { hasLength, matchesField, useForm } from '@mantine/form';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Checkbox from '../Checkbox';

export default function UpdatePasswordForm({
  email,
  code,
}: {
  email: string;
  code: string;
}) {
  const router = useRouter();
  const [resetPasswordVerify, { isLoading }] = useResetPasswordVerifyMutation();

  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
      logout: false,
    },
    validate: {
      password: hasLength({ min: 5 }, 'Password must have 5 or more symbols'),
      confirmPassword: matchesField('password', 'Passwords did not match'),
    },
  });

  type FormValues = typeof form.values;

  const onSubmit = async (values: FormValues) => {
    try {
      const data = await resetPasswordVerify({
        email,
        code,
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      }).unwrap();
      console.log('Reset Password Verification:', data);
      router.push(APP_PAGES.LOGIN);
    } catch (error) {
      console.log(error);
      toast.error('Oops! Something went wrong! Try again later.');
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className='space-y-8'>
      <PasswordInput
        radius='xs'
        label='New Password'
        placeholder=''
        {...form.getInputProps('password')}
        visibilityToggleIcon={({ reveal }) =>
          reveal ? <Eye className='h-5 w-5' /> : <EyeOff className='h-5 w-5' />
        }
        classNames={{
          root: 'form-root',
          label: 'form-label',
          input: cn(
            'form-input',
            'pr-11',
            form?.errors?.password && 'border-brand-red-400 text-secondary'
          ),
          visibilityToggle: 'text-secondary',
          error: 'form-error',
        }}
      />

      <PasswordInput
        radius='xs'
        label='Repeat Password'
        placeholder=''
        {...form.getInputProps('confirmPassword')}
        visibilityToggleIcon={({ reveal }) =>
          reveal ? <Eye className='h-5 w-5' /> : <EyeOff className='h-5 w-5' />
        }
        classNames={{
          root: 'form-root',
          label: 'form-label',
          input: cn(
            'form-input',
            'pr-11',
            form?.errors?.confirmPassword &&
              'border-brand-red-400 text-secondary'
          ),
          visibilityToggle: 'text-secondary',
          error: 'form-error',
        }}
      />

      <Checkbox
        label='Sign out of all active logins'
        {...form.getInputProps('logout', { type: 'checkbox' })}
      />

      <Button
        type='submit'
        loading={isLoading}
        className='btn btn-primary w-full'
      >
        Update Password
      </Button>
    </form>
  );
}
