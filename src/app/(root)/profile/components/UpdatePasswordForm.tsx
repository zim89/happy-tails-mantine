'use client';

import { LoadingOverlay, Stepper, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { Check } from 'lucide-react';
import Link from 'next/link';

import { NewPasswordFields } from '../components/NewPasswordFields';
import classes from '../styles.module.css';
import { useAuth } from '@/shared/hooks/useAuth';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { CodeVerification } from '../components/CodeVerification';
import { VerifyEmailForm } from './VerifyEmailForm';

export default function UpdatePasswordForm() {
  const { currentUser } = useAuth();
  const [step, setStep] = useState(0);

  if (!currentUser) redirect(APP_PAGES.LOGIN);

  const nextStep = () =>
    setStep((current) => (current < 2 ? current + 1 : current));

  return (
    <div className='relative px-4'>
      <LoadingOverlay
        visible={!currentUser.emailVerified}
        zIndex={20}
        overlayProps={{ blur: 2 }}
        loaderProps={{
          children: (
            <VerifyEmailForm
              classNames={{
                root: 'pt-28 px-10',
                headings: 'text-center',
              }}
            />
          ),
        }}
      />

      <Stepper
        active={step}
        color='rgba(0, 0, 0, 1)'
        completedIcon={<Check />}
        classNames={{
          root: 'mt-10 lg:mt-8 flex flex-col items-center relative',
          steps: 'max-w-[700px] px-6 w-full',
        }}
      >
        <Stepper.Step>
          <CodeVerification currentUser={currentUser} nextStep={nextStep} />
        </Stepper.Step>
        <Stepper.Step>
          <hgroup className='text-center'>
            <h1 className='hidden text-[2rem]/[2.4rem] lg:block'>
              Update your password
            </h1>
            <p className={classes.profileParagraph}>
              <span className='inline-block max-w-[360px]'>
                Enter the verification code we just sent to email and create a
                new password
              </span>
            </p>
          </hgroup>
          <NewPasswordFields nextStep={nextStep} />
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
    </div>
  );
}
