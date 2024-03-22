'use client';
import { cn } from '@/shared/lib/utils';
import { Button, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';

import classes from "../styles.module.css";

export const UpdateUserForm = () => {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },

    validate: {
      firstName: hasLength({ min: 2 }, 'Field must have 2 or more characters'),
      lastName: hasLength({ min: 2 }, 'Field must have 2 or more characters'),
      email: isEmail('Invalid email'),
    },
  });

  return (
    <form
      className={cn('mt-8', classes.form)}
      onSubmit={form.onSubmit((values) => {
        console.log(values);
        form.clearErrors();
        form.reset();
      })}
    >
      <TextInput
        label='First Name'
        type='text'
        classNames={{
          root: 'form-root',
          label: 'form-label',
          input: cn(
            'form-input',
            classes.inputSizing,
            form?.errors?.firstName && 'form-error--input'
          ),
          error: 'form-error',
        }}
        {...form.getInputProps('firstName')}
        placeholder='Enter your First Name'
      />
      <TextInput
        label='Confirm Password'
        type='text'
        classNames={{
          root: 'form-root',
          label: 'form-label',
          input: cn(
            'form-input',
            classes.inputSizing,
            form?.errors?.lastName && 'form-error--input'
          ),
          error: 'form-error',
        }}
        {...form.getInputProps('lastName')}
        placeholder='Enter your Last Name'
      />
      <TextInput
        label='Email Address'
        classNames={{
          root: 'form-root',
          label: 'form-label',
          input: cn(
            'form-input',
            classes.inputSizing,
            form?.errors?.email && 'form-error--input'
          ),
          error: 'form-error',
        }}
        {...form.getInputProps('email')}
        placeholder='Enter your Email'
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
