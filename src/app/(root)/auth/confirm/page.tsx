import { Metadata } from 'next';
import Image from 'next/image';
import mailIcon from '@/assets/icons/mail.svg';
import VerifyEmailForm from '@/components/auth/VerifyEmailForm';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Happy Tails | Verify Email Page',
  description: null,
  robots: {
    index: false,
  },
};

export default function Page({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  return (
    <div className='rounded-0.5 bg-primary px-12 pb-14 pt-12'>
      <div className='space-y-4'>
        <Image src={mailIcon} alt='Email icon' width={52} className='h-auto' />

        <h1 className='text-[32px]/[1.2] font-bold'>Verify your identity</h1>

        <VerifyEmailForm email={searchParams.email} />
      </div>
      <Link
        href={APP_PAGES.LOGIN}
        className='mt-[158px] block text-brand-orange-400 transition-colors hover:text-brand-orange-500'
      >
        Sign in to a different account
      </Link>
    </div>
  );
}
