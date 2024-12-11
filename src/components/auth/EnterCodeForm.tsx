'use client';
import { useResetPasswordMutation } from '@/shared/api/authApi';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { handleError } from '@/shared/helpers/error.helpers';
import { cn } from '@/shared/lib/utils';
import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCounter, useInterval } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function EnterCodeForm({ email }: { email: string }) {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [count, handlers] = useCounter(60, { min: 0, max: 60 });
  const interval = useInterval(handlers.decrement, 1000);

  const form = useForm({
    initialValues: {
      code: '',
    },
  });

  type FormValues = typeof form.values;

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [interval]);

  const onSubmit = async (values: FormValues) => {
    router.push(
      `${APP_PAGES.UPDATE_PASSWORD}?email=${email}&code=${values.code}`
    );
  };

  const onResend = async () => {
    handlers.reset();

    try {
      await resetPassword({ email }).unwrap();
    } catch (err) {
      handleError(err, toast.error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className='space-y-8'>
      <TextInput
        radius='xs'
        placeholder='Enter your code'
        {...form.getInputProps('code')}
        classNames={{
          root: 'form-root',
          label: 'form-label',
          input: cn('form-input', form?.errors?.email && 'form-error--input'),
          error: 'form-error',
        }}
      />

      <Button type='submit' className='btn btn-primary w-full'>
        Continue
      </Button>

      <div className='flex justify-end gap-10'>
        <Link href={APP_PAGES.FORGOT_PASSWORD}>Back</Link>
        <Button
          unstyled
          className='text-brand-orange-400 disabled:text-brand-grey-400'
          disabled={count !== 0 || isLoading}
          onClick={onResend}
        >
          Resend Code {count !== 0 && `(${count})`}
        </Button>
      </div>
    </form>
  );
}
