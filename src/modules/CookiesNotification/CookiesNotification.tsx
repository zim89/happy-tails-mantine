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
            By clicking "Accept All", you consent to the use of all cookies.
            However, you can block optional cookies by clicking on "Only
            necessary". More information can be found in our{' '}
            <Link
              className='border-b border-b-secondary'
              href='/privary&cookies'
            >
              Privacy & Cookies Policy
            </Link>
          </p>
        </div>
        <div className='flex flex-col md:ml-auto'>
          <UnstyledButton
            className='flex-1 whitespace-pre rounded-sm bg-secondary px-[35px] py-[10px] text-center font-bold text-primary '
            onClick={handleAccept}
          >
            Accept All
          </UnstyledButton>
          <UnstyledButton
            className='flex-6 ml-auto rounded-sm pl-2 text-center text-[.6rem] font-bold underline md:ml-0'
            onClick={handleAccept}
          >
            Only necessary
          </UnstyledButton>
        </div>
      </Container>
    </div>
  );
}
