'use client';

import { PinInput } from '@mantine/core';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import DarkButton from '@/components/DarkButton';
import { LoaderBackground } from '@/components/LoaderBackground';
import {
  useSendVerificationCodeMutation,
  useVerifyEmailMutation,
} from '@/shared/api/authApi';
import { useAuth } from '@/shared/hooks/useAuth';
import { setAuthData } from '@/shared/redux/auth/authSlice';
import { useAppDispatch } from '@/shared/redux/store';

export const VerifyEmailForm = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const dispatch = useAppDispatch();

  const [
    verifyEmail,
    { isLoading: isLoadingVerification, isSuccess: isVerifiedEmailSuccess },
  ] = useVerifyEmailMutation();
  const [sendCode, { isLoading: isLoadingCode, isSuccess: isSentCodeSuccess }] =
    useSendVerificationCodeMutation();

  if (currentUser?.emailVerified) return null;

  const sendVerificationCode = async () => {
    try {
      await sendCode().unwrap();
    } catch (err) {
      console.error(err);
      toast.error('Failed to send verification code');
    }
  };

  const handleVerifyEmail = async (code: string) => {
    try {
      await verifyEmail({ code }).unwrap();
      toast.success('Email verified successfully');
      dispatch(setAuthData({ ...currentUser, verifiedEmail: true }));
    } catch (err) {
      console.error(err);
      toast.error('Failed to verift the email');
    }
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      <h3>You aren't permitted to the action, unless you verify your email</h3>
      <LoaderBackground loading={isLoadingCode || isLoadingVerification}>
        {isSentCodeSuccess ? (
          <PinInput onComplete={handleVerifyEmail} size='md' length={6} />
        ) : (
          <DarkButton handler={sendVerificationCode}>Verify</DarkButton>
        )}
      </LoaderBackground>
    </div>
  );
};
