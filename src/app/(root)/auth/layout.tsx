'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import dogImg from '@/assets/images/auth-dog.png';
import { useAuth } from '@/shared/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { APP_PAGES } from '@/shared/config/pages-url.config';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.push(APP_PAGES.HOME);
    }
  }, [isAuth, router]);

  return (
    <div className='h-full bg-auth-bg pt-[73px] lg:pt-[73px]'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <Image
            src={dogImg}
            alt='Authentication dog image'
            priority={true}
            width={652}
            height={700}
            sizes='50vw'
            className='mx-auto hidden lg:block'
          />
          <div className='pb-24 pt-16 md:pb-[88px] md:pt-16 lg:py-16'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
