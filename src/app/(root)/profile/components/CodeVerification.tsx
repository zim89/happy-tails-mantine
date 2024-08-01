import { UnstyledButton } from '@mantine/core';
import { toast } from 'react-toastify';

import { cn } from '@/shared/lib/utils';
import classes from '../styles.module.css';
import { useResetPasswordMutation } from '@/shared/api/authApi';
import { User } from '@/shared/types/auth.types';

type Props = {
  nextStep: () => void;
  currentUser: User;
};

export const CodeVerification = ({ nextStep, currentUser }: Props) => {
  const [resetPassword] = useResetPasswordMutation();

  const proceedCode = async () => {
    try {
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
      <UnstyledButton
        className={cn(
          'btn my-4 w-full bg-secondary text-primary',
          classes.inputSizing
        )}
        onClick={proceedCode}
      >
        Send
      </UnstyledButton>
    </>
  );
};
