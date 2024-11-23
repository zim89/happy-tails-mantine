'use client';

import { Center, Stack } from '@mantine/core';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import Loader from '@/components/Loader';
import { useLoginOauthMutation } from '@/shared/api/authApi';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { setAuthData } from '@/shared/redux/auth/authSlice';
import { useAppDispatch } from '@/shared/redux/store';
import axiosInstance from '@/shared/lib/interceptor';

export default function CallbackPage() {
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginOauthMutation();

  useEffect(() => {
    const fn = async () => {
      if (params.get('code')) {
        try {
          await login(params.get('code')!).unwrap();
          const { data } = await axiosInstance.get('/user/info');
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
            Something went wrong
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
