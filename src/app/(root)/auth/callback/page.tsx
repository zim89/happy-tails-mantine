'use client';

import Loader from '@/components/Loader';
import { useLoginOauthMutation } from '@/shared/api/authApi';
import { setAuthData } from '@/shared/redux/auth/authSlice';
import { useAppDispatch } from '@/shared/redux/store';
import { Center } from '@mantine/core';
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
  }, [login, params]);

  if (isLoading)
    if (error)
      return (
        <Center h='100%'>
          <p className='font-medium text-brand-red-400'>Something went wrong</p>
        </Center>
      );

  return (
    <Center h='100%'>
      <Loader size='lg' />
    </Center>
  );
}
