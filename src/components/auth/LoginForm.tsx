'use client';
import Link from 'next/link';
import { PasswordInput, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import Checkbox from '@/components/Checkbox';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/shared/redux/store';
import { useLoginMutation } from '@/shared/api/authApi';
import { setAuthData } from '@/shared/redux/auth/authSlice';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Invalid email'),
      password: hasLength({ min: 1 }, 'Password must have 6 or more symbols'),
    },
  });

  type FormValues = typeof form.values;

  const onSubmit = async (values: FormValues) => {
    try {
      const data = await login(values).unwrap();
      dispatch(setAuthData(data));
      router.push(APP_PAGES.HOME);
    } catch (error) {
      console.log(error);
      toast.error('Oops! Something went wrong! Try again later.');
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

      <div className='space-y-9 md:space-y-4 lg:space-y-8'>
        <div className='flex items-center justify-between text-sm/normal'>
          <div className='flex items-center gap-2'>
            <Checkbox defaultChecked variant='outline' size='16' />
            <span>Remember me</span>
          </div>

          {/*TODO: correct link*/}
          <Link href={'/auth'}>Forgot Password?</Link>
        </div>
        <button className='btn btn-primary w-full' disabled={isLoading}>
          Sign In
        </button>
      </div>
    </form>
  );
}
