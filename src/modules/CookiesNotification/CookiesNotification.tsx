'use client';

import { Container, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';

export default function CookiesNotification() {
  const candidate = localStorage.getItem('cookies_approved');
  const [approved, setApproved] = useState(!!candidate);

  if (approved) return null;

  const handleAccept = () => {
    localStorage.setItem('cookies_approved', 'true');
    setApproved(true);
  };

  return (
    <div className='fixed bottom-0 z-20 w-full bg-primary p-4 shadow-[0px_2px_8px_0px_#00000029] '>
      <Container className='flex w-full flex-col md:flex-row md:place-items-center lg:px-16'>
        <div>
          <h3 className='text-xl font-bold'>Cookie Policy</h3>
          <p className='mb-6 mt-2 text-lg md:mb-0'>
            Our website uses cookies to improve user experience. More
            information can be found in our{' '}
            <Link
              className='border-b border-b-secondary'
              href='/privary&cookies'
            >
              Privacy & Cookies Policy
            </Link>
          </p>
        </div>
        <UnstyledButton
          className='rounded-sm bg-secondary px-[35px] py-[10px] text-center font-bold text-primary md:ml-auto'
          onClick={handleAccept}
        >
          Accept All
        </UnstyledButton>
      </Container>
    </div>
  );
}
