import Link from 'next/link';
import { FacebookIcon, GoogleIcon } from '@/components/Icons';
import LoginForm from '@/components/LoginForm';
import { Metadata } from 'next';

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
        <h1 className='text-[32px]/[1.2] font-bold'>Sign in</h1>
        <p className='flex justify-between text-base md:justify-start md:gap-1'>
          <span>{'Don’t have an account?'}</span>
          <Link href={'/register'} className='text-brand-orange-400'>
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
          <button
            type='button'
            className='flex items-center justify-center gap-2 rounded-0.5 border border-brand-grey-400 py-[14px] text-base font-bold md:py-2.5'
          >
            <GoogleIcon />
            Google
          </button>
          <button
            type='button'
            className='flex items-center justify-center gap-2 rounded-0.5 border border-brand-grey-400 py-[14px] text-base font-bold'
          >
            <FacebookIcon />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
