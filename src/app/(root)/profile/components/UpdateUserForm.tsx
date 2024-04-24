'use client';
import { cn } from '@/shared/lib/utils';
import { Button, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';

import classes from "../styles.module.css";
import { dirtyFields } from '@/shared/lib/helpers';
import { useUpdateDetailsMutation } from '@/shared/api/authApi';
import { useAuth } from '@/shared/hooks/useAuth';

export const UpdateUserForm = () => {
  const { currentUser } = useAuth();
  const [updateUser, { isLoading }] = useUpdateDetailsMutation();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },

    validate: {      
      firstName: val => {
        let error = null;

        if (val.trim().length) {
          error = hasLength({ min: 2 }, "Field must have 2 or more characters")(val);
        }

        return error;
      },
      lastName: val => {
        let error = null;

        if (val.trim().length) {
          error = hasLength({ min: 2 }, "Field must have 2 or more characters")(val);
        }

        return error; 
      },
      email: val => {
        let error = null;

        if (val.trim().length) {
          error = isEmail("Invalid email")(val);
        }
        
        return error; 
      },
    },
  });

  return (
    <form
      className={cn('mt-8', classes.form)}
      onSubmit={form.onSubmit(async (values) => {
        try {
          const [updatedUser, count] = dirtyFields(values);
          // If there are no changes, omit the call to API
          if (count === 0) return;
          if (!currentUser) return;

          const { registerDate, userId, roles, ...prevUser } = currentUser;  
          await updateUser({ ...prevUser, ...updatedUser });

          form.clearErrors();
          form.reset();
        } catch (err) {
          console.log(err);
        }
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
        label='Last Name'
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
