import React from 'react';
import Image from 'next/image';
import dogImg from '@/assets/images/auth-dog.png';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full bg-auth-bg '>
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