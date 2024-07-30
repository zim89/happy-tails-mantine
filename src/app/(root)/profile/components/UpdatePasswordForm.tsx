'use client';

import { Button, PasswordInput, UnstyledButton } from '@mantine/core';
import { useForm, hasLength, matchesField, isNotEmpty } from '@mantine/form';
import { Eye, EyeOff } from 'lucide-react';
import { redirect } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import classes from '../styles.module.css';
import { useAuth } from '@/shared/hooks/useAuth';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { useResetPasswordVerifyMutation } from '@/shared/api/authApi';

type Props = {
  nextStep: () => void;
};
export const UpdatePasswordForm = ({ nextStep }: Props) => {
  const [dispatch] = useResetPasswordVerifyMutation();

  const form = useForm({
    initialValues: {
      code: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      code: (val) => {
        let error = null;

        error = isNotEmpty('The code must be provisioned')(val);

        if (error) return error;

        const reg = /^\d+$/;
        error = val.search(reg);

        if (error === -1) return 'Code must contain only numbers';

        return null;
      },
      password: (val) => {
        let error = null;

        error = hasLength(
          { min: 6 },
          'Password must have 6 or more symbols'
        )(val);

        return error;
      },
      confirmPassword: (val, values) => {
        let error = null;

        error = matchesField('password', 'Passwords do not match')(val, values);

        return error;
      },
    },
  });

  const { currentUser } = useAuth();

  if (!currentUser) redirect(APP_PAGES.LOGIN);

  const updatePassword = async ({
    code,
    newPassword,
  }: {
    code: string;
    newPassword: string;
  }) => {
    try {
      const request = {
        email: currentUser.email,
        newPassword,
        confirmPassword: newPassword,
        code,
      };

      await dispatch(request).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className={cn('mt-8', classes.form)}
      onSubmit={form.onSubmit(async (values) => {
        await updatePassword({
          code: values.code,
          newPassword: values.password,
        });

        nextStep();
        form.clearErrors();
        form.reset();
      })}
    >
      <PasswordInput
        label='Verification code'
        type='password'
        classNames={{
          root: 'form-root',
          label: 'form-label',
          input: cn(
            'form-input',
            classes.inputSizing,
            form?.errors?.password && 'form-error--input'
          ),
          innerInput: 'form-input',
          visibilityToggle: 'text-secondary',
          error: 'form-error',
        }}
        visibilityToggleIcon={({ reveal }) =>
          reveal ? <Eye className='h-5 w-5' /> : <EyeOff className='h-5 w-5' />
        }
        {...form.getInputProps('code')}
        placeholder='Enter the code you found in email box'
      />
      <PasswordInput
        label='New password'
        type='password'
        classNames={{
          root: 'form-root',
          label: 'form-label',
          input: cn(
            'form-input',
            classes.inputSizing,
            form?.errors?.password && 'form-error--input'
          ),
          innerInput: 'form-input',
          visibilityToggle: 'text-secondary',
          error: 'form-error',
        }}
        visibilityToggleIcon={({ reveal }) =>
          reveal ? <Eye className='h-5 w-5' /> : <EyeOff className='h-5 w-5' />
        }
        {...form.getInputProps('password')}
        placeholder='Enter your new password'
      />
      <PasswordInput
        label='Repeat password'
        type='password'
        classNames={{
          root: 'form-root',
          label: 'form-label',
          visibilityToggle: 'text-secondary',
          innerInput: 'form-input',
          input: cn(
            'form-input',
            classes.inputSizing,
            form?.errors?.confirmPassword && 'form-error--input'
          ),
          error: 'form-error',
        }}
        visibilityToggleIcon={({ reveal }) =>
          reveal ? <Eye className='h-5 w-5' /> : <EyeOff className='h-5 w-5' />
        }
        {...form.getInputProps('confirmPassword')}
        placeholder='Confirm your new password'
      />
      <UnstyledButton
        type='submit'
        className={cn(
          'btn mb-20 mt-6 bg-secondary text-primary',
          classes.inputSizing
        )}
      >
        Update Password
      </UnstyledButton>
    </form>
  );
};
