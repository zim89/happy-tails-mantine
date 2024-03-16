'use client';
import { PasswordInput, TextInput } from '@mantine/core';
import { hasLength, isEmail, matchesField, useForm } from '@mantine/form';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useAppDispatch } from '@/shared/redux/store';
import { useRouter } from 'next/navigation';
import { useLoginMutation, useRegisterMutation } from '@/shared/api/authApi';
import { setAuthData } from '@/shared/redux/auth/authSlice';

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [register, { isLoading: isLoadingRegister }] = useRegisterMutation();
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      firstName: hasLength({ min: 2 }, 'Field must have 2 or more characters'),
      lastName: hasLength({ min: 2 }, 'Field must have 2 or more characters'),
      email: isEmail('Invalid email'),
      password: hasLength({ min: 5 }, 'Password must have 5 or more symbols'),
      confirmPassword: matchesField('password', 'Passwords did not match'),
    },
  });

  type FormValues = typeof form.values;

  const onSubmit = async (values: FormValues) => {
    try {
      // FIXME: fix the type of the response
      // @ts-ignore
      const { data: user } = await register(values);
      if (user) {
        // FIXME: fix the type of the response
        // @ts-ignore
        const { data } = await login({
          email: values.email,
          password: values.password,
        });
        dispatch(setAuthData(data));
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className='space-y-5'>
      <TextInput
        radius='xs'
        label='First Name'
        placeholder=''
        {...form.getInputProps('firstName')}
        classNames={{
          root: 'form-root',
          label: 'form-label',
          input: cn(
            'form-input',
            form?.errors?.firstName && 'border-brand-red-400 text-secondary'
          ),
          error: 'form-error',
        }}
      />

      <TextInput
        radius='xs'
        label='Last Name'
        placeholder=''
        {...form.getInputProps('lastName')}
        classNames={{
          root: 'form-root',
          label: 'form-label',
          input: cn(
            'form-input',
            form?.errors?.lastName && 'border-brand-red-400 text-secondary'
          ),
          error: 'form-error',
        }}
      />

      <TextInput
        radius='xs'
        label='Email'
        placeholder=''
        {...form.getInputProps('email')}
        classNames={{
          root: 'form-root',
          label: 'form-label',
          input: cn(
            'form-input',
            form?.errors?.email && 'border-brand-red-400 text-secondary'
          ),
          error: 'form-error',
        }}
      />

      <PasswordInput
        radius='xs'
        label='Password'
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
        label='Confirm Password'
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

      <button
        className='btn btn-primary w-full'
        disabled={isLoadingRegister || isLoadingLogin}
      >
        Sign Up
      </button>
    </form>
  );
}
