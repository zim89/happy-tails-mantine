import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Image from 'next/image';

export default function ForgotPasswordPage() {
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
        <h1 className='mb-3.5 text-[32px]/[1.2] font-bold'>Update Password</h1>
        <p className='mb-4 flex justify-between text-base md:justify-start md:gap-1'>
          Enter your email address and we&apos;ll send you a code to reset your
          password.
        </p>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
