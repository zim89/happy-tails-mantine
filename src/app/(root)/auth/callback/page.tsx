'use client';

import Loader from '@/components/Loader';
import { useLoginOauthMutation } from '@/shared/api/authApi';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { setAuthData } from '@/shared/redux/auth/authSlice';
import { useAppDispatch } from '@/shared/redux/store';
import { Center, Stack } from '@mantine/core';
import Link from 'next/link';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function CallbackPage() {
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginOauthMutation();

  useEffect(() => {
    const fn = async () => {
      if (params.get('code')) {
        try {
          const { data } = await login(params.get('code')!).unwrap();
          dispatch(setAuthData(data));
          router.push('/');
        } catch (err) {
          console.log(err);
        }
      }
    };

    fn();
  }, [login, dispatch, router, params]);

  if (error)
    return (
      <Center h='100%'>
        <Stack>
          <p className='text-2xl font-bold text-brand-red-400'>
            {error.status}: Something went wrong
          </p>

          <Link href={APP_PAGES.LOGIN} className='btn btn-primary w-full'>
            Return to login page
          </Link>
        </Stack>
      </Center>
    );

  return (
    <Center h='100%'>
      <Loader size='lg' />
    </Center>
  );
}
