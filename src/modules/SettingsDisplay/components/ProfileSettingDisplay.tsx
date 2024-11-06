import {
  LoadingOverlay,
  Stepper,
  Transition,
  UnstyledButton,
} from '@mantine/core';
import { Check, LockKeyhole, UserRoundCogIcon } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

import BrandBox from '@/components/BrandBox';
import { CodeVerification } from '@/app/(root)/profile/components/CodeVerification';
import { useAuth } from '@/shared/hooks/useAuth';
import { NewPasswordFields } from '@/app/(root)/profile/components/NewPasswordFields';
import { UpdateUserForm } from '@/app/(root)/profile/components/UpdateUserForm';

export const ProfileSettingDisplay = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { currentUser } = useAuth();
  const [step, setStep] = useState(0);

  const nextStep = () =>
    setStep((current) => (current < 2 ? current + 1 : current));

  return (
    <BrandBox
      className='relative max-h-full min-h-[60vh] max-w-full'
      title={isEditing ? 'Edit the password' : 'Edit the profile'}
      rightSection={
        <UnstyledButton
          style={{
            border: '1px solid #C8C8C8',
            padding: 10,
            borderRadius: 2,
            backgroundColor: '#FFF',
          }}
          onClick={setIsEditing.bind(null, !isEditing)}
        >
          {isEditing ? (
            <UserRoundCogIcon size={16} strokeWidth={3} />
          ) : (
            <LockKeyhole size={16} />
          )}
        </UnstyledButton>
      }
    >
      <>
        <LoadingOverlay
          visible={!currentUser || !currentUser.roles.includes('ROLE_ADMIN')}
          zIndex={10}
          overlayProps={{ blur: 2 }}
          loaderProps={{
            children: (
              <h3 className='text-lg font-semibold'>
                {`You haven't authorized! Try to log in again.`}
              </h3>
            ),
          }}
        />
        <Transition
          mounted={!isEditing}
          transition='slide-right'
          enterDelay={250}
        >
          {(styles) => (
            <div style={styles} className='mt-8'>
              <UpdateUserForm />
            </div>
          )}
        </Transition>
        <Transition
          mounted={isEditing}
          transition='slide-left'
          enterDelay={250}
        >
          {(styles) => (
            <div style={styles}>
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
                  <CodeVerification
                    currentUser={currentUser!}
                    nextStep={nextStep}
                  />
                </Stepper.Step>
                <Stepper.Step>
                  <hgroup className='text-center'>
                    <h1 className='hidden text-[2rem]/[2.4rem] lg:block'>
                      Update your password
                    </h1>
                    <p>
                      <span className='inline-block max-w-[360px]'>
                        Enter the verification code we just sent to email and
                        create a new password
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
                      <p>
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
          )}
        </Transition>
      </>
    </BrandBox>
  );
};
