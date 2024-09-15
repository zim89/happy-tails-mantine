import Link from 'next/link';
import { Metadata } from 'next';
import { FacebookIcon, GoogleIcon } from '@/components/Icons';
import LoginForm from '@/components/auth/LoginForm';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { GOOGLE_OAUTH_REDIRECT } from '@/shared/constants/env.const';
import { signIn } from '../../../../../auth';
import { UnstyledButton } from '@mantine/core';

export const metadata: Metadata = {
  title: 'Happy Tails | Login Page',
  description: null,
  robots: {
    index: false,
  },
};

export default function Page() {
  return (
    <div className='space-y-4 bg-primary px-7 pb-14 pt-12 md:mx-auto md:w-[458px] md:px-12 md:pb-16 lg:w-[469px]'>
      {/* Heading */}
      <div>
        <h1 className='text-[2rem]/[1.2] font-bold'>Sign in</h1>
        <p className='flex justify-between text-base md:justify-start md:gap-1'>
          <span>{'Don’t have an account?'}</span>
          <Link href={APP_PAGES.REGISTER} className='text-brand-orange-400'>
            Create an account
          </Link>
        </p>
      </div>

      <LoginForm />

      {/* Sign in with providers */}
      <div className='space-y-4 pt-8 md:pt-3 '>
        <p className='relative text-center text-base text-brand-grey-700 before:absolute before:left-0 before:top-1/2 before:h-px before:w-[98px] before:-translate-y-1/2 before:bg-brand-grey-400 after:absolute after:right-0 after:top-1/2 after:h-px after:w-[98px] after:-translate-y-1/2 after:bg-brand-grey-400'>
          Or Sign in with
        </p>
        <div className='grid grid-cols-2 gap-5 md:gap-4'>
          <form
            action={async () => {
              'use server';
              await signIn('google', {
                redirectTo: 'http://localhost:3000/auth/callback',
                redirect: true,
              });
            }}
          >
            <UnstyledButton
              type='submit'
              className='flex items-center justify-center gap-2 rounded-0.5 border border-brand-grey-400 py-[14px] text-base font-bold md:py-2.5'
            >
              <GoogleIcon />
              Google
            </UnstyledButton>
          </form>
          {/* <button
            type='button'
            className='flex items-center justify-center gap-2 rounded-0.5 border border-brand-grey-400 py-[14px] text-base font-bold'
          >
            <FacebookIcon />
            Facebook
          </button> */}
          <form
            action={async () => {
              'use server';
              await signIn('facebook', {
                redirectTo: 'http://localhost:3000/',
                redirect: true,
              });
            }}
          >
            <UnstyledButton
              type='submit'
              className='flex items-center justify-center gap-2 rounded-0.5 border border-brand-grey-400 py-[14px] text-base font-bold md:py-2.5'
            >
              <FacebookIcon />
              Facebook
            </UnstyledButton>
          </form>
        </div>
      </div>
    </div>
  );
}
