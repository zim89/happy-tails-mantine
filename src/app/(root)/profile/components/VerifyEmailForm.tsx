'use client';

import { PinInput } from '@mantine/core';
import { toast } from 'react-toastify';

import DarkButton from '@/components/DarkButton';
import { LoaderBackground } from '@/components/LoaderBackground';
import {
  useSendVerificationCodeMutation,
  useVerifyEmailMutation,
} from '@/shared/api/authApi';
import { useAuth } from '@/shared/hooks/useAuth';
import { setAuthData } from '@/shared/redux/auth/authSlice';
import { useAppDispatch } from '@/shared/redux/store';
import { cn } from '@/shared/lib/utils';

type Props = {
  classNames?: {
    root?: string;
    headings?: string;
  };
  vars?: { [key: string]: string };
};

export const VerifyEmailForm = ({ classNames, vars }: Props) => {
  const { currentUser } = useAuth();
  const dispatch = useAppDispatch();

  const [verifyEmail, { isLoading: isLoadingVerification }] =
    useVerifyEmailMutation();
  const [sendCode, { isLoading: isLoadingCode, isSuccess: isSentCodeSuccess }] =
    useSendVerificationCodeMutation();

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
      dispatch(setAuthData({ ...currentUser, emailVerified: true }));
    } catch (err) {
      console.error(err);
      toast.error('Failed to verify the email');
    }
  };

  return (
    <div
      className={cn(
        'xl:mt-0 -mt-48 flex flex-col items-center gap-4 md:-mt-32',
        classNames?.root
      )}
    >
      <h3
        className={cn(
          'xl:max-w-60 max-w-md text-xl font-semibold text-brand-orange-400',
          classNames?.headings
        )}
        style={{
          textShadow: '0px 0px 2px #ffb969',
        }}
      >
        {isSentCodeSuccess
          ? 'Enter the code sent to your email'
          : `You aren't permitted to the action, unless you verify your email`}
      </h3>
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
