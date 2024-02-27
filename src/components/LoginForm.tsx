'use client';
import Link from 'next/link';
import { PasswordInput, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import Checkbox from '@/components/Checkbox';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Invalid email'),
      password: hasLength({ min: 6 }, 'Password must have 6 or more symbols'),
    },
  });

  type FormValues = typeof form.values;

  const onSubmit = async (values: FormValues) => {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res && !res.error) {
      router.push('/profile');
    } else {
      console.log(res);
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
        <button className='btn btn-primary w-full'>Sign In</button>
      </div>
    </form>
  );
}
