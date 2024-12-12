'use client';
import Link from 'next/link';
import { NumberInput, PasswordInput, TextInput } from '@mantine/core';
import { hasLength, isEmail, matches, useForm } from '@mantine/form';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/shared/redux/store';
import { useLoginMutation, useVerifyEmailMutation } from '@/shared/api/authApi';
import { setAuthData } from '@/shared/redux/auth/authSlice';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { handleError } from '@/shared/helpers/error.helpers';

export default function VerifyEmailForm({ email }: { email: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const form = useForm({
    initialValues: {
      // email: email,
      // password: '',
      code: '',
    },
    validate: {
      // email: isEmail('Invalid email'),
      // password: hasLength({ min: 1 }, 'Password must have 6 or more symbols'),
    },
  });

  type FormValues = typeof form.values;

  const onSubmit = async (values: FormValues) => {
    try {
      // const data = await verifyEmail(values).unwrap();
      // console.log(data);
      // if (data.error) {
      //   console.log(data.status);
      // }
      // dispatch(setAuthData(data));
      // router.push(APP_PAGES.HOME);
    } catch (err) {
      handleError(err, toast.error);
      // if (error.status === 404) {
      //   toast.error(
      //     'The code has expired. Click resend code and enter the received code'
      //   );
      // }

      // if (
      //   error.status === 500 &&
      //   error.data.message === 'Index 0 out of bounds for length 0'
      // ) {
      //   toast.error('Invalid email or password. Please try again');
      // }
    }
  };

  return (
    <div>
      <div className='mb-9 text-base'>
        <p>
          {opened
            ? `Enter the code we've sent to`
            : `To confirm your identity we'll send you a verification code to`}
        </p>
        <p className='font-bold'>{email}</p>
      </div>

      {opened ? (
        <form onSubmit={form.onSubmit(onSubmit)} className='space-y-8'>
          {/*<TextInput*/}
          {/*  radius='xs'*/}
          {/*  label='Email'*/}
          {/*  placeholder=''*/}
          {/*  {...form.getInputProps('email')}*/}
          {/*  classNames={{*/}
          {/*    root: 'form-root',*/}
          {/*    label: 'form-label',*/}
          {/*    input: cn(*/}
          {/*      'form-input',*/}
          {/*      form?.errors?.email && 'border-brand-red-400 text-secondary'*/}
          {/*    ),*/}
          {/*    error: 'form-error',*/}
          {/*  }}*/}
          {/*/>*/}

          {/*<PasswordInput*/}
          {/*  radius='xs'*/}
          {/*  label='Password'*/}
          {/*  placeholder=''*/}
          {/*  prefix=''*/}
          {/*  {...form.getInputProps('password')}*/}
          {/*  visibilityToggleIcon={({ reveal }) =>*/}
          {/*    reveal ? (*/}
          {/*      <Eye className='h-5 w-5' />*/}
          {/*    ) : (*/}
          {/*      <EyeOff className='h-5 w-5' />*/}
          {/*    )*/}
          {/*  }*/}
          {/*  classNames={{*/}
          {/*    root: 'form-root',*/}
          {/*    label: 'form-label',*/}
          {/*    input: cn(*/}
          {/*      'form-input',*/}
          {/*      'pr-11',*/}
          {/*      form?.errors?.password && 'border-brand-red-400 text-secondary'*/}
          {/*    ),*/}
          {/*    visibilityToggle: 'text-secondary',*/}
          {/*    error: 'form-error',*/}
          {/*  }}*/}
          {/*/>*/}

          <NumberInput
            radius='xs'
            label='Code'
            placeholder=''
            hideControls
            allowNegative={false}
            allowDecimal={false}
            {...form.getInputProps('code')}
            onChange={(value) => form.setValues({ code: String(value) })}
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

          <button type='submit'>Verify</button>
        </form>
      ) : (
        <button
          className={cn('btn btn-primary w-full')}
          onClick={() => setOpened(true)}
        >
          Continue
        </button>
      )}
    </div>
  );
}
