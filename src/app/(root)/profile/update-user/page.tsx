'use client';
import { cn } from '@/shared/lib/utils';
import { Button, TextInput } from '@mantine/core';
import { useForm, hasLength, isEmail } from '@mantine/form';

export default function UpdateUser() {
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
    <>
      <h1 className='heading hidden text-center lg:block'>
        Update your details
      </h1>
      <form
        className='mt-8 flex flex-col gap-4 md:items-center'
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
              'form-input md:w-[458px] lg:w-[315px]',
              form?.errors?.firstName && 'border-brand-red-400 text-secondary'
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
              'form-input md:w-[458px] lg:w-[315px]',
              form?.errors?.lastName && 'border-brand-red-400 text-secondary'
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
              'form-input md:w-[458px] lg:w-[315px]',
              form?.errors?.email && 'border-brand-red-400 text-secondary'
            ),
            error: 'form-error',
          }}
          {...form.getInputProps('email')}
          placeholder='Enter your Email'
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
