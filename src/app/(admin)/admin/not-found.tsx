'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UnstyledButton } from '@mantine/core';

export const metadata: Metadata = {
  title: 'Not Found | 404',
  robots: {
    index: false,
  },
};

export default function NotFound() {
  const { back } = useRouter();

  return (
    <div className='mt-10 flex justify-center md:mt-24'>
      <div className='flex items-center gap-16'>
        <Image src='/images/404_admin.png' height={356} width={291} alt='404' />
        <div className='max-w-[382px]'>
          <h2 className='text-4xl/[44px]'>Ooops...! Page not found</h2>
          <p className='my-4'>
            {`The page you are looking for doesn’t exist or an other error
            occurred.`}
          </p>
          <UnstyledButton
            className='rounded-sm bg-secondary px-14 py-[10px] text-primary'
            onClick={back.bind(null)}
          >
            Go Back
          </UnstyledButton>
        </div>
      </div>
    </div>
  );
}
