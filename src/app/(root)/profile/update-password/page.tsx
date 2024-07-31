'use client';

import { Button, Stepper, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { Check } from 'lucide-react';
import Link from 'next/link';

import axios from '@/shared/lib/interceptor';
import { cn } from '@/shared/lib/utils';
import { UpdatePasswordForm } from '../components/UpdatePasswordForm';
import classes from '../styles.module.css';
import { useAuth } from '@/shared/hooks/useAuth';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { useResetPasswordMutation } from '@/shared/api/authApi';

export default function UpdatePassword() {
  const { currentUser } = useAuth();
  const [step, setStep] = useState(0);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  if (!currentUser) redirect(APP_PAGES.LOGIN);

  const nextStep = () =>
    setStep((current) => (current < 2 ? current + 1 : current));

  const proceedCode = async () => {
    try {
      await resetPassword({ email: currentUser.email }).unwrap();

      nextStep();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stepper
      active={step}
      color='rgba(0, 0, 0, 1)'
      completedIcon={<Check />}
      classNames={{
        root: 'mt-10 lg:mt-8 flex flex-col items-center',
        steps: 'max-w-[700px] px-6 w-full',
      }}
    >
      <Stepper.Step>
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
      </Stepper.Step>
      <Stepper.Step>
        <hgroup className='text-center'>
          <h1 className='hidden text-[2rem]/[2.4rem] lg:block'>
            Update your password
          </h1>
          <p className={classes.profileParagraph}>
            <span className='inline-block max-w-[360px]'>
              Enter the verification code we just sent to email and create a new
              password
            </span>
          </p>
        </hgroup>
        <UpdatePasswordForm nextStep={nextStep} />
      </Stepper.Step>
      <Stepper.Completed>
        <div className='flex flex-col'>
          <hgroup className='text-center'>
            <h1 className='whitespace-pre text-[2rem]/[2.4rem] font-black'>
              <span>Password Updated</span>
              <Check className='ml-4 inline-block' size={36} />
            </h1>
            <p className={classes.profileParagraph}>
              <span className='inline-block max-w-[360px]'>
                Your password has been successfully updated
              </span>
            </p>
          </hgroup>
          <UnstyledButton className='btn mt-8 bg-secondary text-primary'>
            <Link href='/profile'>Return to my account</Link>
          </UnstyledButton>
        </div>
      </Stepper.Completed>
    </Stepper>
  );
}
