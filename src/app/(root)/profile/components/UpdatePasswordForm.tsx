'use client';
import { cn } from '@/shared/lib/utils';
import { Button, PasswordInput } from '@mantine/core';
import { useForm, hasLength, matchesField } from '@mantine/form';
import { Eye, EyeOff } from 'lucide-react';

import classes from '../styles.module.css';
import { dirtyFields } from '@/shared/lib/helpers';

export const UpdatePasswordForm = () => {
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },

    validate: {
      password: (val) => {
        let error = null;

        if (val.trim().length > 0) {
          error = hasLength(
            { min: 6 },
            'Password must have 6 or more symbols'
          )(val);
        }

        return error;
      },
      confirmPassword: (val, values) => {
        let error = null;

        if (val.trim().length > 0) {
          error = matchesField('password', 'Passwords do not match')(
            val,
            values
          );
        }

        return error;
      },
    },
  });

  return (
    <form
      className={cn('mt-8', classes.form)}
      onSubmit={form.onSubmit((values) => {
        const [updatedPassword, count] = dirtyFields(values);
          // If there is no changes, omit the call to API
          if (count === 0) return;
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
        placeholder='Confirm your new password.'
      />
      <Button
        type='submit'
        className={cn('btn mt-9 bg-black uppercase', classes.inputSizing)}
      >
        Update
      </Button>
    </form>
  );
};
