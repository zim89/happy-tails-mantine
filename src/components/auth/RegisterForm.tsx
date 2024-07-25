'use client';
import { PasswordInput, TextInput } from '@mantine/core';
import { hasLength, isEmail, matchesField, useForm } from '@mantine/form';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '@/shared/api/authApi';
import { setAuthData } from '@/shared/redux/auth/authSlice';
import { useAppDispatch } from '@/shared/redux/store';

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: true,
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
      const response = await register(values).unwrap();

      if (response.userId) {
        toast.success(
          'Account created successfully! Please verify your email later.'
        );
        dispatch(setAuthData(response));
        router.push(APP_PAGES.HOME);
      }
    } catch (error: any) {
      console.log(error);

      if (error.status === 409) {
        toast.error('Email already exists. Please try another one.');
        return;
      }

      toast.error('Oops! Something went wrong! Try again later.');
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
        className={cn('btn btn-primary w-full', isLoading && 'btn-disabled')}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className='flex items-center justify-center gap-2'>
            <Loader2 className='animate-spin text-primary' />
            Loading ...
          </span>
        ) : (
          'Sign Up'
        )}
      </button>
    </form>
  );
}
