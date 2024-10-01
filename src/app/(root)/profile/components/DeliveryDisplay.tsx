'use client';

import { LoadingOverlay } from '@mantine/core';
import { DeliveryForm } from '../components/DeliveryForm';

import classes from '../styles.module.css';

import { useAuth } from '@/shared/hooks/useAuth';
import { VerifyEmailForm } from './VerifyEmailForm';

export default function DeliveryDisplay() {
  const { currentUser } = useAuth();

  return (
    <div className={classes.box}>
      <LoadingOverlay
        visible={!currentUser?.emailVerified}
        zIndex={10}
        overlayProps={{ blur: 2 }}
        loaderProps={{
          children: <VerifyEmailForm />,
        }}
      />

      <hgroup className='text-center'>
        <h1 className={classes.boxHeading}>Delivery address</h1>
        <p className='py-4 font-light'>
          * Required fields are marked with an asterisk <br />
          Please enter your delivery address
        </p>
      </hgroup>
      <DeliveryForm />
    </div>
  );
}
