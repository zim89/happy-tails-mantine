import { UnstyledButton } from '@mantine/core';
import { toast } from 'react-toastify';

import { cn } from '@/shared/lib/utils';
import classes from '../styles.module.css';
import { useResetPasswordMutation } from '@/shared/api/authApi';
import { User } from '@/shared/types/auth.types';
import { useState } from 'react';
import { LoaderBackground } from '@/components/LoaderBackground';

type Props = {
  nextStep: () => void;
  currentUser: User;
};

export const CodeVerification = ({ nextStep, currentUser }: Props) => {
  const [resetPassword] = useResetPasswordMutation();
  const [sent, setSent] = useState(false);

  const proceedCode = async () => {
    try {
      setSent(true);
      await resetPassword({ email: currentUser.email }).unwrap();
      nextStep();
    } catch (err) {
      console.log('Error: ', err);
      toast.error('Oops! Something went wrong! Try again later.');
    }
  };

  return (
    <>
      <hgroup className='text-center'>
        <h1 className='text-[2rem]/[2.4rem]'>Update your password</h1>
        <p className={cn(classes.profileParagraph)}>
          <span className='inline-block max-w-[360px]'>
            To change your password, we will send you verification code to{' '}
            <b>{currentUser.email}</b>
          </span>
        </p>
      </hgroup>
      <LoaderBackground loading={sent} className='my-4'>
        <UnstyledButton
          className={cn(
            'btn !w-full bg-secondary text-primary',
            classes.inputSizing
          )}
          onClick={proceedCode}
          disabled={sent}
        >
          Send
        </UnstyledButton>
      </LoaderBackground>
    </>
  );
};
