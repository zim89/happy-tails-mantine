'use client';
import { cn } from '@/shared/lib/utils';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm, hasLength, matchesField } from '@mantine/form';
import { Eye, EyeOff } from 'lucide-react';

export default function UpdatePassword() {
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },

    validate: {
      password: hasLength({ min: 6 }, 'Password must have 6 or more symbols'),
      confirmPassword: matchesField('password', 'Passwords do not match'),
    },
  });

  return (
    <>
      <h1 className='heading hidden text-center lg:block'>
        Update your password
      </h1>
      <form
        className='mt-8 flex flex-col gap-4 md:items-center'
        onSubmit={form.onSubmit((values) => {
          console.log(values);
          form.clearErrors();
          form.reset();
        })}
      >
        <PasswordInput
          label='Password'
          type='password'
          classNames={{
            root: 'form-root',
            label: 'form-label',
            input: cn(
              'form-input md:w-[458px] lg:w-[315px]',
              form?.errors?.password && 'border-brand-red-400 text-secondary'
            ),
            innerInput: 'form-input',
            visibilityToggle: 'text-secondary',
            error: 'form-error',
          }}
          visibilityToggleIcon={({ reveal }) =>
            reveal ? (
              <Eye className='h-5 w-5' />
            ) : (
              <EyeOff className='h-5 w-5' />
            )
          }
          {...form.getInputProps('password')}
          placeholder='Enter your new password.'
        />
        <PasswordInput
          label='Confirm Password'
          type='password'
          classNames={{
            root: 'form-root',
            label: 'form-label',
            visibilityToggle: 'text-secondary',
            innerInput: 'form-input',
            input: cn(
              'form-input md:w-[458px] lg:w-[315px]',
              form?.errors?.confirmPassword &&
                'border-brand-red-400 text-secondary'
            ),
            error: 'form-error',
          }}
          visibilityToggleIcon={({ reveal }) =>
            reveal ? (
              <Eye className='h-5 w-5' />
            ) : (
              <EyeOff className='h-5 w-5' />
            )
          }
          {...form.getInputProps('confirmPassword')}
          placeholder='Confirm your new password.'
        />
        <Button
          type='submit'
          className='btn mt-9 bg-black uppercase md:w-[458px] lg:w-[315px]'
        >
          Update
        </Button>
      </form>
    </>
  );
}
