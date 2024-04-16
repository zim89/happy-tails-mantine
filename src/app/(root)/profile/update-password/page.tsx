'use client';
import { Button, Stepper } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { Check } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { UpdatePasswordForm } from '../components/UpdatePasswordForm';
import classes from '../styles.module.css';
import { useAuth } from '@/shared/hooks/useAuth';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import Link from 'next/link';

export default function UpdatePassword() {
  const [isSent, setIsSent] = useState(false);
  const { currentUser, access_token } = useAuth();
  const [step, setStep] = useState(0);

  if (!currentUser) redirect(APP_PAGES.LOGIN);

  const nextStep = () =>
    setStep((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setStep((current) => (current > 0 ? current - 1 : current));

  const proceedCode = async () => {
    try {
      const request = new URLSearchParams({
        email: currentUser.email,
      });

      // await axios.post(
      //   process.env.NEXT_PUBLIC_BASE_URL! + '/users/reset-password',
      //   request,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${access_token}`,
      //     },
      //   }
      // );

      nextStep();
      setIsSent(true);
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
          <h1 className='heading'>Update your password</h1>
          <p className={cn(classes.profileParagraph)}>
            <span className='inline-block max-w-[360px]'>
              To change your password, we will send you verification code to{' '}
              <b>{currentUser.email}</b>
            </span>
          </p>
        </hgroup>
        <Button
          classNames={{
            root: cn('btn mt-4 w-full bg-black', classes.inputSizing),
          }}
          onClick={proceedCode}
        >
          Send
        </Button>
      </Stepper.Step>
      <Stepper.Step>
        <hgroup className='text-center'>
          <h1 className={cn(classes.profileHeading, 'heading')}>
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
          <p className={cn(classes.profileParagraph, "text-3xl")}>The password has changed!</p>
          <Button classNames={{ root: 'bg-black' }}>
            <Link href='/profile'>Return to my account</Link>
          </Button>
        </div>
      </Stepper.Completed>
    </Stepper>
  );
}
