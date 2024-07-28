import EnterCodeForm from '@/components/auth/EnterCodeForm';
import UpdatePasswordForm from '@/components/auth/UpdatePasswordForm';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: { email?: string; code?: string };
}) {
  if (!searchParams.email) {
    redirect(APP_PAGES.FORGOT_PASSWORD);
  }

  if (!searchParams.code) {
    return (
      <div className='space-y-4 bg-primary px-7 pb-14 pt-12 md:mx-auto md:w-[458px] md:px-12 md:pb-16 lg:w-[469px]'>
        {/* Heading */}
        <div>
          <Image
            className='mb-4'
            src='/icons/message.svg'
            width={52}
            height={52}
            alt='Email message icon'
          />
          <h1 className='mb-3.5 text-[32px]/[1.2] font-bold'>
            Update Password
          </h1>
          <p className='mb-4 text-base'>
            Enter the code we just sent to <strong>{searchParams.email}</strong>
          </p>

          <EnterCodeForm email={searchParams.email} />
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4 bg-primary px-7 pb-14 pt-12 md:mx-auto md:w-[458px] md:px-12 md:pb-16 lg:w-[469px]'>
      {/* Heading */}
      <div>
        <h1 className='mb-3.5 text-[32px]/[1.2] font-bold'>Update Password</h1>
        <p className='mb-4 text-base'>
          {searchParams.email} <br />
          <span className='text-xs text-brand-grey-900'>Personal Account</span>
        </p>

        <UpdatePasswordForm
          email={searchParams.email}
          code={searchParams.code}
        />
      </div>
    </div>
  );
}
